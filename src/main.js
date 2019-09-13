// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import moment from 'vue-moment'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

// import { MdButton, MdContent, MdTabs } from './components/vue-material/components'
// import VueMaterial from './components/vue-material/components'
// import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCaretDown, // MIRROR THIS IN test > unit > setup.js !!!!!!
  faCaretRight,
  faCaretUp,
  faEllipsisV,
  faPencilAlt,
  faPlus,
  faSave,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App'
import router from './router'

import { store } from './store/store'

Vue.router = router

library.add(faCaretDown) // MIRROR THIS IN test > unit > setup.js !!!!!!
library.add(faCaretRight)
library.add(faCaretUp)
library.add(faEllipsisV)
library.add(faPencilAlt)
library.add(faPlus)
library.add(faSave)
library.add(faUser)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(moment)
Vue.use(BootstrapVue)
Vue.use(VueMaterial)

Vue.http.interceptors.push((request) => {
  if (!request.url.endsWith('login')) {
    const token = localStorage.getItem('token')
    request.headers.set('Authorization', 'Bearer ' + token)
  }
})

Vue.filter('allCaps', (value) => {
  return (typeof value === 'string')
    ? value.toUpperCase()
    : ''
})

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
