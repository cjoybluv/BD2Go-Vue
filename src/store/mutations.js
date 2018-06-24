import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  USER_REQUEST,
  USER_SUCCESS,
  SELECT_ITEM,
  SELECT_CONTACT
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
  [SELECT_ITEM]: (state, itemId) => {
    state.contentControls.selectedItemId = itemId
    state.contentControls.selectedContactId = null
  },
  [SELECT_CONTACT]: (state, contactId) => {
    state.contentControls.selectedContactId = contactId
    state.contentControls.selectedItemId = null
  }
}
