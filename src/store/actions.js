import {
  getUser,
  postLogin,
  postSignup,
  getContacts,
  postContact
} from '../api/api'

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  USER_REQUEST,
  USER_SUCCESS,
  CONTACTS_REQUEST,
  CONTACTS_SUCCESS,
  SELECT_ITEM,
  SELECT_CONTACT,
  ADD_CONTACT_REQUEST,
  ADD_CONTACT_SUCCESS
} from './mutation-types'

export default {
  fetchUser: ({ commit, dispatch }, payload) => {
    commit(USER_REQUEST)
    return new Promise((resolve, reject) => {
      getUser(payload).then(user => {
        commit(USER_SUCCESS, user.body)
        dispatch('fetchContacts', user.body._id)
      }).catch(err => {
        reject(err)
      })
    })
  },
  login: ({ commit, dispatch }, payload) => {
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
  signup: ({ commit, dispatch }, payload) => {
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
  fetchContacts: ({ commit }, payload) => {
    commit(CONTACTS_REQUEST, payload)
    return new Promise((resolve, reject) => {
      getContacts(payload).then(function (data) {
        commit(CONTACTS_SUCCESS, data.body)
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  addContact: ({ commit }, payload) => {
    commit(ADD_CONTACT_REQUEST, payload)
    return new Promise((resolve, reject) => {
      postContact(payload).then(function (data) {
        commit(ADD_CONTACT_SUCCESS, data.body)
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  viewItem: ({ commit }, payload) => {
    commit(SELECT_ITEM, payload)
  },
  viewContact: ({ commit }, payload) => {
    commit(SELECT_CONTACT, payload)
  }
}
