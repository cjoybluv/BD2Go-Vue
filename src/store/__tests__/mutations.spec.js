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

  test('LOGIN_SUCCESS sets user & token, isAuthenticated to true', () => {
    const state = {
      user: '',
      token: '',
      isAuthenticated: false
    }
    const authData = {
      user: 'Dave',
      token: 'xyz'
    }
    mutations[LOGIN_SUCCESS](state, authData)
    expect(state.user).toBe('dave')
    expect(state.token).toBe('xyz')
    expect(state.isAuthenticated).toBe(true)
  })
})
