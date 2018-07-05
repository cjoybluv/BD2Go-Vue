import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGN_OUT,
  USER_REQUEST,
  USER_SUCCESS,
  CONTACT_REQUEST,
  CONTACT_SUCCESS,
  SET_ME,
  CONTACTS_REQUEST,
  CONTACTS_SUCCESS,
  LOCATIONS_SUCCESS,
  ITEMS_SUCCESS,
  SELECT_ITEM,
  SELECT_CONTACT,
  ADD_CONTACT_REQUEST,
  ADD_CONTACT_SUCCESS,
  UPDATE_CONTACT_REQUEST,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  SET_IS_AUTHENTICATED,
  APP_DATA_REQUEST,
  APP_DATA_SUCCESS
} from './mutation-types'

export default {
  [APP_DATA_REQUEST]: (state, key) => {
    state.appData[key] = null
    state.loading = true
  },
  [APP_DATA_SUCCESS]: (state, appData) => {
    state.loading = false
    state.appData[appData.key] = appData.data
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
  [SIGNUP_REQUEST]: (state) => {
    state.user = null
  },
  [SIGNUP_SUCCESS]: (state, data) => {
    state.user = data.user
  },
  [SIGN_OUT]: (state) => {
    state.contacts = []
    state.contactItems = []
    state.locations = []
    state.user = null
    state.me = null
    state.token = null
    state.isAuthenticated = false
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
  [USER_REQUEST]: (state) => {
    state.user = null
  },
  [USER_SUCCESS]: (state, user) => {
    state.user = user
  },
  [CONTACT_REQUEST]: (state, contactId) => {
    state.loading = true
  },
  [CONTACT_SUCCESS]: (state, contact) => {
    state.loading = false
  },
  [SET_ME]: (state, contact) => {
    state.me = contact
  },
  [CONTACTS_REQUEST]: (state, ownerId) => {
    state.contacts = []
    state.loading = true
  },
  [CONTACTS_SUCCESS]: (state, contacts) => {
    state.contacts = contacts
    state.loading = false
  },
  [LOCATIONS_SUCCESS]: (state, locations) => {
    state.locations = locations
  },
  [ITEMS_SUCCESS]: (state, items) => {
    state.items = items
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
  [UPDATE_CONTACT_REQUEST]: (state, contact) => {
    state.loading = true
  },
  [UPDATE_CONTACT_SUCCESS]: (state, updatedContact) => {
    state.loading = false
    const contactIdx = state.contacts.findIndex(contact => contact._id === updatedContact._id)
    state.contacts[contactIdx] = updatedContact
  },
  [UPDATE_USER_REQUEST]: (state, user) => {
    state.loading = true
  },
  [UPDATE_USER_SUCCESS]: (state, updatedUser) => {
    state.loading = false
    state.user = updatedUser
  },
  [SET_IS_AUTHENTICATED]: (state, value) => {
    state.isAuthenticated = value
  }
}
