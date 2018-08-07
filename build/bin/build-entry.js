const Components = require('../../components.json')
const fs = require('fs')
const render = require('json-templater/string')
// const uppercamelcase = require('uppercamelcase')
const path = require('path')
const endOfLine = require('os').EOL

const OUTPUT_PATH = path.join(__dirname, '../../src/index.js')
const IMPORT_TEMPLATE =
  'import {{name}} from \'../components/{{package}}/index.js\''
const INSTALL_COMPONENT_TEMPLATE = '  {{name}}'
const MAIN_TEMPLATE = `// Automatically generated by './build/bin/build-entry.js'

{{include}}

const components = [
{{install}},
]

const install = (Vue, opts = {}) => {
  components.map(component => {
    Vue.component(component.name, component)
  });

  Vue.prototype.$VUEUWP = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  }

}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

module.exports = {
  version: '{{version}}',
  install,
{{list}}
}

module.exports.default = module.exports
`

delete Components.font

const ComponentNames = Object.keys(Components)

const includeComponentTemplate = []
const installTemplate = []
const listTemplate = []

ComponentNames.forEach((name) => {
  const componentName = name

  includeComponentTemplate.push(render(IMPORT_TEMPLATE, {
    name: componentName,
    package: name
  }))

  if (
    ['Loading', 'MessageBox', 'Notification', 'Message'].indexOf(componentName) === -1
  ) {
    installTemplate.push(render(INSTALL_COMPONENT_TEMPLATE, {
      name: componentName,
      component: name
    }))
  }

  if (componentName !== 'Loading') listTemplate.push(`  ${componentName}`)
})

const template = render(MAIN_TEMPLATE, {
  include: includeComponentTemplate.join(endOfLine),
  install: installTemplate.join(`,${endOfLine}`),
  version: process.env.VERSION || require('../../package.json').version,
  list: listTemplate.join(`,${endOfLine}`)
})

fs.writeFileSync(OUTPUT_PATH, template)
console.log('[build entry] DONE:', OUTPUT_PATH)
