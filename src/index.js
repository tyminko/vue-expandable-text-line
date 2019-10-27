// Import vue component
// @ts-ignore
import component from './ExpandableTextLine.vue'

// Declare install function executed by Vue.use()
export function install (Vue) {
  // @ts-ignore
  if (install.installed) return
  // @ts-ignore
  install.installed = true
  Vue.component('ExpandableTextLine', component)
}

// Create module definition for Vue.use()
const plugin = {
  install
}

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  // @ts-ignore
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}

// To allow use as module (npm/webpack/etc.) export component
export default component
