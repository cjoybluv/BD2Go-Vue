import {
  getUser,
  postLogin,
  postSignup
} from '../api/api'

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

export default {
  fetchUser: ({ commit }, payload) => {
    commit(USER_REQUEST)
    return new Promise((resolve, reject) => {
      getUser(payload).then(user => {
        commit(USER_SUCCESS, user.body)
      }).catch(err => {
        reject(err)
      })
    })
  },
  login: ({commit, dispatch}, payload) => {
    commit(LOGIN_REQUEST)
    return new Promise((resolve, reject) => {
      postLogin(payload).then(function (authData) {
        commit(LOGIN_SUCCESS, authData.body)
        dispatch('fetchUser', payload.email)
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
      postSignup(user).then(function (data) {
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
