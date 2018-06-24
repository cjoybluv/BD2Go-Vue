import Vue from 'vue'

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  USER_REQUEST,
  USER_SUCCESS,
  SELECT_ITEM,
  SELECT_CONTACT
} from './mutation-types'

const PATHNAME = 'http://127.0.0.1:8881/api/v1'

export default {
  getUser: ({ commit }, payload) => {
    commit(USER_REQUEST)
    Vue.http.get(PATHNAME + '/users?email=' + payload).then((user) => {
      commit(USER_SUCCESS, user.body)
    })
  },
  login: ({commit, dispatch}, payload) => {
    commit(LOGIN_REQUEST)
    return new Promise((resolve, reject) => {
      Vue.http.post(PATHNAME + '/auth/login', payload).then(function (authData) {
        commit(LOGIN_SUCCESS, authData.body)
        dispatch('getUser', payload.email)
        resolve(authData)
      }).catch(err => {
        reject(err)
      })
    })
  },
  signup: ({commit, dispatch}, payload) => {
    commit(SIGNUP_REQUEST)
    return new Promise((resolve, reject) => {
      const user = {
        username: payload.username,
        email: payload.email,
        password: payload.password
      }
      Vue.http.post(PATHNAME + '/auth/signup', user).then(function (data) {
        commit(SIGNUP_SUCCESS, data.body)
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  viewItem: (context, payload) => {
    context.commit(SELECT_ITEM, payload)
  },
  viewContact: (context, payload) => {
    context.commit(SELECT_CONTACT, payload)
  }
}
