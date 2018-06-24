import mutations from '../mutations'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  USER_REQUEST,
  USER_SUCCESS,
  SELECT_ITEM,
  SELECT_CONTACT
} from '../mutation-types'

describe('mutations', () => {
  test('LOGIN_REQUEST sets user & token to null, isAuthenticated to false', () => {
    const state = {
      user: 'dave',
      token: 'xyz',
      isAuthenticated: true
    }
    mutations[LOGIN_REQUEST](state)
    expect(state.user).toBe(null)
    expect(state.token).toBe(null)
    expect(state.isAuthenticated).toBe(false)
  })

  test('LOGIN_SUCCESS sets user & token, isAuthenticated to true, localStorage.token', () => {
    const state = {
      user: '',
      token: '',
      isAuthenticated: false
    }
    const authData = {
      user: 'dave',
      token: 'xyz'
    }
    mutations[LOGIN_SUCCESS](state, authData)
    expect(state.user).toBe('dave')
    expect(state.token).toBe('xyz')
    expect(state.isAuthenticated).toBe(true)
    expect(localStorage.setItem).toHaveBeenLastCalledWith('token', 'xyz')
    expect(localStorage.__STORE__['token']).toBe('xyz')
  })

  test('SIGNUP_REQUEST sets user to null', () => {
    const state = {
      user: 'dave'
    }
    mutations[SIGNUP_REQUEST](state)
    expect(state.user).toBe(null)
  })

  test('SIGNUP_SUCCESS sets user', () => {
    const state = {
      user: ''
    }
    const data = {
      user: 'dave'
    }
    mutations[SIGNUP_SUCCESS](state, data)
    expect(state.user).toBe('dave')
  })

  test('USER_REQUEST sets user to null', () => {
    const state = {
      user: 'dave'
    }
    mutations[USER_REQUEST](state)
    expect(state.user).toBe(null)
  })

  test('USER_SUCCESS sets user', () => {
    const state = {
      user: ''
    }
    const user = 'dave'
    mutations[USER_SUCCESS](state, user)
    expect(state.user).toBe('dave')
  })

  test('SELECT_ITEM sets selectedItemId & clears selectedContactId', () => {
    const state = {
      contentControls: {
        selectedItemId: null,
        selectedContactId: 123
      }
    }
    const itemId = 456
    mutations[SELECT_ITEM](state, itemId)
    expect(state.contentControls.selectedItemId).toBe(456)
    expect(state.contentControls.selectedContactId).toBe(null)
  })

  test('SELECT_CONTACT sets selectedContactId & clears selectedItemId', () => {
    const state = {
      contentControls: {
        selectedItemId: 456,
        selectedContactId: null
      }
    }
    const contactId = 123
    mutations[SELECT_CONTACT](state, contactId)
    expect(state.contentControls.selectedItemId).toBe(null)
    expect(state.contentControls.selectedContactId).toBe(123)
  })
})
