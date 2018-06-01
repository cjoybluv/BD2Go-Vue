import Vue from 'vue'
import Vuex from 'vuex'

// mock data
import contacts from './mockData/contacts'
import contactItems from './mockData/contactItems'
import locations from './mockData/locations'
import language from './language/en-us'

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
      state.contentControls.selectedContactId = null
    },
    viewContact: (state, contactId) => {
      state.contentControls.selectedContactId = contactId
      state.contentControls.selectedItemId = null
    }
  },
  actions: {
    viewItem: (context, payload) => {
      context.commit('viewItem', payload)
    },
    viewContact: (context, payload) => {
      context.commit('viewContact', payload)
    }
  }
})
