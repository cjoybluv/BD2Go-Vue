import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

// mock data
// import contacts from './mockData/contacts'
import contactItems from './mockData/contactItems'
import locations from './mockData/locations'

// externalized strings
import language from './language/en-us'

const state = {
  loading: false,
  contentControls: {
    selectedItemId: 1, // contactItem.id of selected Item
    selectedContactId: null // contact.id of selected Contact
  },
  language: language,
  contacts: [],
  contactItems: contactItems,
  locations: locations,
  user: {
    _id: '',
    email: '',
    username: ''
  },
  token: null,
  isAuthenticated: false
}

const storeConfig = {
  state,
  getters,
  mutations,
  actions
}

Vue.use(Vuex)

export const store = new Vuex.Store(storeConfig)
