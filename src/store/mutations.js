import Vue from 'vue'
import {
  ADD_CHECKLIST_ITEM,
  ADD_CHECKLIST_REQUEST,
  ADD_CHECKLIST_SUCCESS,
  ADD_CONTACT_REQUEST,
  ADD_CONTACT_SUCCESS,
  ADD_LOCATION_REQUEST,
  ADD_LOCATION_SUCCESS,
  APP_DATA_REQUEST,
  APP_DATA_SUCCESS,
  CHECKLISTS_REQUEST,
  CHECKLISTS_SUCCESS,
  CONTACT_REQUEST,
  CONTACT_SUCCESS,
  CONTACTS_REQUEST,
  CONTACTS_SUCCESS,
  EDIT_CHECKLIST,
  EDIT_CONTACT_COMPLETE,
  EDIT_CONTACT_REQUEST,
  EDIT_LOCATION_COMPLETE,
  EDIT_LOCATION_REQUEST,
  ITEMS_REQUEST,
  ITEMS_SUCCESS,
  LOCATIONS_REQUEST,
  LOCATIONS_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  NEW_CONTACT_REQUEST,
  NEW_LOCATION_REQUEST,

  SELECT_CONTACT,
  SELECT_ITEM,
  SET_IS_AUTHENTICATED,
  SET_ME,
  SIGN_OUT,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  UPDATE_CHECKLIST_TITLE,
  UPDATE_CHECKLIST_REQUEST,
  UPDATE_CHECKLIST_SUCCESS,
  UPDATE_CONTACT_REQUEST,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  USER_REQUEST,
  USER_SUCCESS
} from './mutation-types'

export default {
  [ADD_CHECKLIST_ITEM]: (state, newItem) => {
    state.currentChecklist.items.push(newItem)
  },
  [ADD_CHECKLIST_REQUEST]: (state, checklist) => {
    state.loading = true
  },
  [ADD_CHECKLIST_SUCCESS]: (state, checklist) => {
    state.loading = false
    state.checklists.push(checklist)
    state.checklists.sort(function (a, b) {
      if (a.title >= b.title) {
        return 0
      } else {
        return -1
      }
    })
    state.currentChecklist = {
      title: '',
      items: []
    }
  },
  [ADD_CONTACT_REQUEST]: (state, contact) => {
    state.loading = true
  },
  [ADD_CONTACT_SUCCESS]: (state, contact) => {
    state.loading = false
    state.contentControls.selectedContactId = contact._id
    state.contentControls.selectedItemId = null
    state.contacts.push(contact)
  },
  [ADD_LOCATION_REQUEST]: (state, location) => {
    state.loading = true
  },
  [ADD_LOCATION_SUCCESS]: (state, location) => {
    state.loading = false
    state.locations.push(location)
  },
  [APP_DATA_REQUEST]: (state, key) => {
    state.appData[key] = null
    state.loading = true
  },
  [APP_DATA_SUCCESS]: (state, appData) => {
    state.loading = false
    state.appData[appData.key] = appData.data
  },
  [CHECKLISTS_REQUEST]: (state, ownerId) => {
    state.checklists = []
    state.loading = true
  },
  [CHECKLISTS_SUCCESS]: (state, checklists) => {
    state.checklists = checklists
    state.loading = false
  },
  [CONTACT_REQUEST]: (state, contactId) => {
    state.loading = true
  },
  [CONTACT_SUCCESS]: (state, contact) => {
    state.loading = false
  },
  [CONTACTS_REQUEST]: (state, ownerId) => {
    state.contacts = []
    state.loading = true
  },
  [CONTACTS_SUCCESS]: (state, contacts) => {
    state.contacts = contacts
    state.loading = false
  },
  [EDIT_CHECKLIST]: (state, checklist) => {
    state.currentChecklist = checklist
  },
  [EDIT_CONTACT_COMPLETE]: (state) => {
    state.contentControls.editContact = null
  },
  [EDIT_CONTACT_REQUEST]: (state, contact) => {
    state.contentControls.editContact = { pronoun: 'null', ...contact }
  },
  [EDIT_LOCATION_COMPLETE]: (state) => {
    state.contentControls.editLocation = null
  },
  [EDIT_LOCATION_REQUEST]: (state, location) => {
    state.contentControls.editLocation = { ...location }
  },
  [ITEMS_REQUEST]: (state, ownerId) => {
    state.items = []
    state.loading = true
  },
  [ITEMS_SUCCESS]: (state, items) => {
    state.items = items
  },
  [LOCATIONS_REQUEST]: (state, ownerId) => {
    state.locations = []
    state.loading = false
  },
  [LOCATIONS_SUCCESS]: (state, locations) => {
    state.locations = locations
  },
  [LOGIN_REQUEST]: (state) => {
    state.user = null
    state.token = null
    state.isAuthenticated = false
  },
  [LOGIN_SUCCESS]: (state, authData) => {
    state.user = authData.user
    state.token = authData.token
    state.isAuthenticated = true
    localStorage.setItem('token', authData.token)
    localStorage.setItem('user', JSON.stringify(authData.user))
  },
  [NEW_CONTACT_REQUEST]: (state, contact) => {
    console.log('NEW_CONTACT_REQUEST', contact)
    state.contentControls.editContact = { ...contact }
  },
  [NEW_LOCATION_REQUEST]: (state, location) => {
    state.contentControls.editLocation = { ...location }
  },
  [SELECT_CONTACT]: (state, contactId) => {
    state.contentControls.selectedContactId = contactId
    state.contentControls.selectedItemId = null
  },
  [SELECT_ITEM]: (state, itemId) => {
    state.contentControls.selectedItemId = itemId
    state.contentControls.selectedContactId = null
  },
  [SET_IS_AUTHENTICATED]: (state, value) => {
    state.isAuthenticated = value
  },
  [SET_ME]: (state, contact) => {
    state.me = contact
  },
  [SIGN_OUT]: (state) => {
    state.contacts = []
    state.items = []
    state.locations = []
    state.user = null
    state.me = null
    state.token = null
    state.isAuthenticated = false
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
  [SIGNUP_REQUEST]: (state) => {
    state.user = null
  },
  [SIGNUP_SUCCESS]: (state, data) => {
    state.user = data.user
  },
  [UPDATE_CHECKLIST_TITLE]: (state, title) => {
    state.currentChecklist.title = title
  },
  [UPDATE_CHECKLIST_REQUEST]: (state, checklist) => {
    state.loading = true
  },
  [UPDATE_CHECKLIST_SUCCESS]: (state, updatedChecklist) => {
    state.loading = false
    const checklistIdx = state.checklists.findIndex(checklist => checklist._id === updatedChecklist._id)
    Vue.set(state.checklists, checklistIdx, updatedChecklist)
    state.currentChecklist = {
      title: '',
      items: []
    }
  },
  [UPDATE_CONTACT_REQUEST]: (state, contact) => {
    state.loading = true
  },
  [UPDATE_CONTACT_SUCCESS]: (state, updatedContact) => {
    state.loading = false
    const contactIdx = state.contacts.findIndex(contact => contact._id === updatedContact._id)
    Vue.set(state.contacts, contactIdx, updatedContact)
  },
  [UPDATE_USER_REQUEST]: (state, user) => {
    state.loading = true
  },
  [UPDATE_USER_SUCCESS]: (state, updatedUser) => {
    state.loading = false
    state.user = updatedUser
  },
  [USER_REQUEST]: (state) => {
    state.user = null
  },
  [USER_SUCCESS]: (state, user) => {
    state.user = user
  }
}
