import Vue from 'vue'
import Vuex from 'vuex'

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
    contacts: [
      {
        id: 1,
        name: 'Flying High Creative',
        contact: 'Dave',
        street: '6354 SW Garden Home Rd',
        city: 'Portland',
        st: 'OR',
        zip: '97219',
        phone: '541-602-0409'
      },
      {
        id: 2,
        name: 'Liberty Natural',
        contact: 'Jim',
        city: 'Clackamas',
        st: 'OR'
      },
      {
        id: 3,
        name: 'Ellenwood Group',
        contact: 'Robert',
        city: 'Portland',
        st: 'OR'
      }
    ],
    contactItems: [
      {
        id: 1,
        contactId: 1,
        contactName: 'Flying High Creative',
        type: 'appt',
        subject: 'remake bd2go',
        content: "Red Leader... This is Gold Leader. We're starting out attack run. I copy, Gold Leader. Move into position. Stay in attack formation! The exhaust post is... marked and locked in! Switch power to front deflector screens. How many guns do you think, Gold Five. I'd say about twenty guns. Some on the surface, some on the towers. Death Star will be in range in five minutes. Switching to targeting computer. Computer's locked. Getting a signal. The guns...they've stopped! Stabilize your read deflectors. Watch for enemy fighters.",
        dateTime: new Date(2018, 4, 28, 10, 12, 0)
      },
      {
        id: 2,
        contactId: 1,
        contactName: 'Flying High Creative',
        type: 'task',
        subject: 'when & where component',
        content: 'populate with state data',
        dateTime: new Date(2018, 4, 28, 14, 0, 0)
      },
      {
        id: 3,
        contactId: 1,
        contactName: 'Flying High Creative',
        type: 'appt',
        subject: 'hot tub',
        content: 'get Naked',
        dateTime: new Date(2018, 4, 27, 18, 30, 0)
      },
      {
        id: 4,
        contactId: 1,
        contactName: 'Flying High Creative',
        type: 'note',
        subject: 'no date note',
        content: 'keep the formatting',
        dateTime: null
      },
      {
        id: 5,
        contactId: 2,
        contactName: 'Liberty Natural',
        type: 'appt',
        subject: 'cloud app',
        content: 'have lunch, talk it out',
        dateTime: new Date(2018, 4, 31, 10, 12, 0)
      },
      {
        id: 6,
        contactId: 2,
        contactName: 'Liberty Natural',
        type: 'task',
        subject: 'email jim',
        content: 'populate with state data',
        dateTime: new Date(2018, 4, 29, 14, 0, 0)
      }
    ]
  },
  getters: {
    contactItems: state => {
      return state.contactItems
    },
    selectedContactItem: state => {
      return state.contactItems.find(item => item.id === state.contentControls.selectedItemId)
    }
  }
})
