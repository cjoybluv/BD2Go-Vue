// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'vue-moment'
import { store } from './store/store'

Vue.config.productionTip = false
Vue.use(moment)

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
