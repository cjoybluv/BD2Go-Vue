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
      selectedItem: { contactIndex: 0, itemIndex: 0 } // index# to contactItems of user selected item
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
        phone: '541-602-0409',
        contactItems: [
          {
            type: 'appt',
            subject: 'remake bd2go',
            content: "Red Leader... This is Gold Leader. We're starting out attack run. I copy, Gold Leader. Move into position. Stay in attack formation! The exhaust post is... marked and locked in! Switch power to front deflector screens. How many guns do you think, Gold Five. I'd say about twenty guns. Some on the surface, some on the towers. Death Star will be in range in five minutes. Switching to targeting computer. Computer's locked. Getting a signal. The guns...they've stopped! Stabilize your read deflectors. Watch for enemy fighters.",
            dateTime: new Date(2018, 4, 28, 10, 12, 0)
          },
          {
            type: 'task',
            subject: 'when & where component',
            content: 'populate with state data',
            dateTime: new Date(2018, 4, 28, 14, 0, 0)
          },
          {
            type: 'appt',
            subject: 'hot tub',
            content: 'get Naked',
            dateTime: new Date(2018, 4, 27, 18, 30, 0)
          },
          {
            type: 'note',
            subject: 'no date note',
            content: 'keep the formatting',
            dateTime: null
          }
        ]
      },
      {
        id: 2,
        name: 'Liberty Natural',
        contact: 'Jim',
        city: 'Clackamas',
        st: 'OR',
        contactItems: [
          {
            type: 'appt',
            subject: 'cloud app',
            content: 'have lunch, talk it out',
            dateTime: new Date(2018, 4, 31, 10, 12, 0)
          },
          {
            type: 'task',
            subject: 'email jim',
            content: 'populate with state data',
            dateTime: new Date(2018, 4, 29, 14, 0, 0)
          }
        ]
      },
      {
        id: 2,
        name: 'Ellenwood Group',
        contact: 'Robert',
        city: 'Portland',
        st: 'OR'
      }
    ]
  },
  getters: {
    contactItems: state => {
      let contactItems = []
      state.contacts.forEach(contact => {
        if (contact.contactItems) {
          contact.contactItems.forEach(item => {
            contactItems.push({contactId: contact.id, contactName: contact.name, ...item})
          })
        }
      })
      return contactItems
    },
    selectedContactItem: state => {
      const selectedItem = state.contentControls.selectedItem
      return (selectedItem.contactIndex !== null && selectedItem.itemIndex !== null)
        ? {
          contactId: state.contacts[selectedItem.contactIndex].id,
          contactName: state.contacts[selectedItem.contactIndex].name,
          ...state.contacts[selectedItem.contactIndex].contactItems[selectedItem.itemIndex]
        }
        : ''
    }
  }
})
