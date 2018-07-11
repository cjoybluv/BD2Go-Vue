import Vue from 'vue'
import {
  ADD_CONTACT_REQUEST,
  ADD_CONTACT_SUCCESS,
  APP_DATA_REQUEST,
  APP_DATA_SUCCESS,
  CONTACT_REQUEST,
  CONTACT_SUCCESS,
  CONTACTS_REQUEST,
  CONTACTS_SUCCESS,
  EDIT_CONTACT_COMPLETE,
  EDIT_CONTACT_REQUEST,
  ITEMS_REQUEST,
  ITEMS_SUCCESS,
  LOCATIONS_REQUEST,
  LOCATIONS_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  NEW_CONTACT_REQUEST,
  SELECT_CONTACT,
  SELECT_ITEM,
  SET_IS_AUTHENTICATED,
  SET_ME,
  SIGN_OUT,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  UPDATE_CONTACT_REQUEST,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  USER_REQUEST,
  USER_SUCCESS
} from './mutation-types'

export default {
  [ADD_CONTACT_REQUEST]: (state, contact) => {
    state.loading = true
  },
  [ADD_CONTACT_SUCCESS]: (state, contact) => {
    state.loading = false
    state.contentControls.selectedContactId = contact._id
    state.contentControls.selectedItemId = null
    state.contacts.push(contact)
  },
  [APP_DATA_REQUEST]: (state, key) => {
    state.appData[key] = null
    state.loading = true
  },
  [APP_DATA_SUCCESS]: (state, appData) => {
    state.loading = false
    state.appData[appData.key] = appData.data
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
  [EDIT_CONTACT_COMPLETE]: (state) => {
    state.contentControls.editContact = null
  },
  [EDIT_CONTACT_REQUEST]: (state, contact) => {
    state.contentControls.editContact = contact
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
  [NEW_CONTACT_REQUEST]: (state) => {
    state.contentControls.editContact = {}
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
