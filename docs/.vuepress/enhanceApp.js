import VueCode from 'viewcode/dist/vuecode.common'
import 'viewcode/dist/vuecode.css'
import Example from '../theme/example'
import Demo from '../theme/demo'
import Color from './pages/color'
import './main.styl'
export default ({
    Vue, // the version of Vue being used in the VuePress app
    options, // the options for the root Vue instance
    router, // the router instance for the app
    siteData
  }) => {
    // ...apply enhancements to the app
    Vue.use(VueCode,{
      theme:'flat'
    })
    Vue.component('color', Color)
    Vue.component('example', Example)
    Vue.component('demo', Demo)
}