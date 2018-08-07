// Automatically generated by './build/bin/build-entry.js'

import Button from '../components/Button/index.js'
import Switch from '../components/Switch/index.js'
import Slider from '../components/Slider/index.js'
import TextBox from '../components/TextBox/index.js'
import Dialog from '../components/Dialog/index.js'

const components = [
  Button,
  Switch,
  Slider,
  TextBox,
  Dialog,
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
  version: '0.1.1',
  install,
  Button,
  Switch,
  Slider,
  TextBox,
  Dialog
}

module.exports.default = module.exports
