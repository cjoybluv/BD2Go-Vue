import Vue from 'vue'
import Vuex from 'vuex'

// mock data
import contacts from './mockData/contacts'
import contactItems from './mockData/contactItems'
import locations from './mockData/locations'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    header: {
      appTitle: 'BD 2 Go!',
      us: 'Flying High Creative'
    },
    contentControls: {
      selectedItemId: 1, // contactItem.id of selected Item
      selectedContactId: null
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
    },
    selectedContact: state => {
      return state.contacts.find(contact => contact.id === state.contentControls.selectedContactId)
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
