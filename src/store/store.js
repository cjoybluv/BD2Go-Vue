import Vue from 'vue'
import Vuex from 'vuex'

// mock data
import contacts from './contacts'
import contactItems from './contactItems'
import locations from './locations'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    header: {
      appTitle: 'BD 2 Go!',
      us: 'Flying High Creative'
    },
    contentControls: {
      selectedItemId: 1 // contactItem.id of selected Item
    },
    contacts: contacts,
    contactItems: contactItems,
    locations: locations
  },
  getters: {
    contactItems: state => {
      return state.contactItems
    },
    selectedContactItem: state => {
      return state.contactItems.find(item => item.id === state.contentControls.selectedItemId)
    }
  },
  mutations: {
    viewItem: (state, itemId) => {
      state.contentControls.selectedItemId = itemId
    }
  },
  actions: {
    viewItem: (context, payload) => {
      context.commit('viewItem', payload)
    }
  }
})
