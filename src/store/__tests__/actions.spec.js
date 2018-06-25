import flushPromises from 'flush-promises'
import actions from '../actions'
import {
  getUser,
  postLogin
} from '../../api/api'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  USER_REQUEST,
  USER_SUCCESS
} from '../mutation-types'
import { debug } from 'util'
jest.mock('../../api/api')

describe('actions', () => {
  test('fetchUser: commits USER_REQUEST, commits USER_SUCCESS', async () => {
    const user = {
      body: {
        id: 1,
        email: 'test@email.com',
        password: 'encrypted',
        username: 'test'
      }
    }
    const err = {error: 'not found'}
    const payload = user.email
    getUser.mockImplementation(calledWith => {
      return calledWith === payload
        ? Promise.resolve(user)
        : Promise.reject(err)
    })
    const context = {
      commit: jest.fn()
    }

    actions.fetchUser(context, payload)
    await flushPromises()

    expect(context.commit).toBeCalledWith(USER_REQUEST)
    expect(context.commit).toHaveBeenLastCalledWith(USER_SUCCESS, user.body)
  })

  test('login: commits LOGIN_REQUEST, commits LOGIN_SUCCESS, dispatches "fetchUser"', async () => {
    const authData = {
      body: {token: 'xyz'}
    }
    const err = {error: 'Not Authorized'}
    const payload = {
      email: 'test@email.com',
      password: 'password'
    }
    postLogin.mockImplementation(calledWith => {
      return calledWith === payload
        ? Promise.resolve(authData)
        : Promise.reject(err)
    })
    const context = {
      commit: jest.fn(),
      dispatch: jest.fn()
    }

    actions.login(context, payload)
    await flushPromises()

    expect(context.commit).toBeCalledWith(LOGIN_REQUEST)
    expect(context.commit).toHaveBeenLastCalledWith(LOGIN_SUCCESS, authData.body)
    expect(context.dispatch).toHaveBeenCalledWith('fetchUser', payload.email)
  })
})
