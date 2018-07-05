import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

// mock data
import appData from './mockData/appData'
import contactItems from './mockData/contactItems'
import locations from './mockData/locations'

// externalized strings
import language from './language/en-us'

const state = {
  loading: false,
  appData,
  contentControls: {
    selectedItemId: 1, // contactItem.id of selected Item
    selectedContactId: null // contact._id of selected Contact
  },
  language: language,
  contacts: [],
  contactItems,
  locations,
  user: {
    _id: '',
    email: '',
    username: '',
    meContactId: ''
  },
  me: {},
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
