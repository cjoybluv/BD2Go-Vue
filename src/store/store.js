import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

// mock data

// externalized strings
import language from './language/en-us'

const state = {
  loading: false,
  appData: {},
  contentControls: {
    selectedItemId: null, // item._id of selected Item
    selectedContactId: null, // contact._id of selected Contact
    selectedLocationId: null, // location._id of selected Location
    editContact: null, // copy of selecledContact while editing
    editLocation: null // copy of selectedLocation while editing
  },
  checklists: [],
  currentChecklist: {
    title: '',
    items: []
  },
  language: language,
  contacts: [],
  items: [],
  locations: [],
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
