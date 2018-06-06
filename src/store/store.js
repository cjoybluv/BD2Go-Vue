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
    locations: locations,
    user: null
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
    login: (state, user) => {
      Vue.http.post('http://127.0.0.1:8881/api/login', user).then(function (user) {
        console.log('LOGGED-IN:', user)
        state.user = user.body

        // this.$router.push('/')
      })
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
      context.commit('login', payload)
    },
    viewItem: (context, payload) => {
      context.commit('viewItem', payload)
    },
    viewContact: (context, payload) => {
      context.commit('viewContact', payload)
    }
  }
})
