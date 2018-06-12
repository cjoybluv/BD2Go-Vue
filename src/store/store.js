import Vue from 'vue'
import Vuex from 'vuex'

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS
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
    token: null
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
    },
    [LOGIN_SUCCESS]: (state, authData) => {
      state.user = authData.user
      state.token = authData.token
      localStorage.setItem('token', authData.token)
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
    login: (context, payload) => {
      context.commit(LOGIN_REQUEST)

      return new Promise((resolve, reject) => {
        Vue.http.post(PATHNAME + '/auth/login', payload).then(function (authData) {
          context.commit(LOGIN_SUCCESS, authData.body)
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
