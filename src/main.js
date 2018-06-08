// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import moment from 'vue-moment'
import { store } from './store/store'

Vue.router = router

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(moment)

Vue.http.options.root = 'http://127.0.0.1:8881/api/v1'

Vue.use(require('@websanova/vue-auth'), {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/vue-resource.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js')
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
