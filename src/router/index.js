import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import Profile from '@/pages/Profile'

import {store} from '../store/store.js'
import { LOGIN_SUCCESS } from '../store/mutation-types.js'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {requiresAuth: true}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {requiresAuth: false}
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      meta: {requiresAuth: false}
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {requiresAuth: true}
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))
    if (token && user) {
      const authData = {token, user}
      store.commit(LOGIN_SUCCESS, authData)
      store.dispatch('fetchContacts', user._id)
      if (user.meContactId) store.dispatch('fetchMe', user.meContactId)
    }
    if (!store.state.isAuthenticated) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
