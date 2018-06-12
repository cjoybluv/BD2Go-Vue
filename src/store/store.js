import Vue from 'vue'
import Vuex from 'vuex'

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  USER_REQUEST,
  USER_SUCCESS
} from './mutation-types'

// mock data
import contacts from './mockData/contacts'
import contactItems from './mockData/contactItems'
import locations from './mockData/locations'

// externalized strings
import language from './language/en-us'

const PATHNAME = 'http://127.0.0.1:8881/api/v1'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    contentControls: {
      selectedItemId: 1, // contactItem.id of selected Item
      selectedContactId: null // contact.id of selected Contact
    },
    language: language,
    contacts: contacts,
    contactItems: contactItems,
    locations: locations,
    user: null,
    token: null,
    isAuthenticated: false
  },
  getters: {
    contactItems: state => {
      return state.contactItems
    },
    selectedContactItem: state => {
      return state.contactItems.find(item => item.id === state.contentControls.selectedItemId)
    },
    selectedContact: state => {
      return state.contacts.find(contact => contact.id === state.contentControls.selectedContactId)
    }
  },
  mutations: {
    [LOGIN_REQUEST]: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
    [LOGIN_SUCCESS]: (state, authData) => {
      state.user = authData.user
      state.token = authData.token
      state.isAuthenticated = true
      localStorage.setItem('token', authData.token)
    },
    [USER_REQUEST]: (state) => {
      state.user = null
    },
    [USER_SUCCESS]: (state, user) => {
      state.user = user
    },
    viewItem: (state, itemId) => {
      state.contentControls.selectedItemId = itemId
      state.contentControls.selectedContactId = null
    },
    viewContact: (state, contactId) => {
      state.contentControls.selectedContactId = contactId
      state.contentControls.selectedItemId = null
    }
  },
  actions: {
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
    viewItem: (context, payload) => {
      context.commit('viewItem', payload)
    },
    viewContact: (context, payload) => {
      context.commit('viewContact', payload)
    }
  }
})
