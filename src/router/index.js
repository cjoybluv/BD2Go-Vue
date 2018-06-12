import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token')
        console.log('router-beforeEnter', token)
        if (!token) {
          next({
            path: '/login'
          })
        } else {
          next()
        }
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {auth: false}
    }
  ],
  mode: 'history'
})
