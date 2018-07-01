import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  USER_REQUEST,
  USER_SUCCESS,
  CONTACTS_REQUEST,
  CONTACTS_SUCCESS,
  SELECT_ITEM,
  SELECT_CONTACT,
  ADD_CONTACT_REQUEST,
  ADD_CONTACT_SUCCESS,
  EDIT_CONTACT
} from './mutation-types'

export default {
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
  },
  [SIGNUP_REQUEST]: (state) => {
    state.user = null
  },
  [SIGNUP_SUCCESS]: (state, data) => {
    state.user = data.user
  },
  [USER_REQUEST]: (state) => {
    state.user = null
  },
  [USER_SUCCESS]: (state, user) => {
    state.user = user
  },
  [CONTACTS_REQUEST]: (state, ownerId) => {
    state.contacts = []
    state.loading = true
  },
  [CONTACTS_SUCCESS]: (state, contacts) => {
    state.contacts = contacts
    state.loading = false
  },
  [SELECT_ITEM]: (state, itemId) => {
    state.contentControls.selectedItemId = itemId
    state.contentControls.selectedContactId = null
  },
  [SELECT_CONTACT]: (state, contactId) => {
    state.contentControls.selectedContactId = contactId
    state.contentControls.selectedItemId = null
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
  [EDIT_CONTACT]: (state, contactId) => {
    state.contentControls.editContactId = contactId
  }
}
