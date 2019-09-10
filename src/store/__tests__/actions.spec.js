import flushPromises from 'flush-promises'
import isEqual from 'lodash.isequal'

import actions from '../actions'
import {
  postChecklist,
  getUser,
  postLogin,
  postSignup
} from '../../api/api'
import {
  ADD_CHECKLIST_REQUEST,
  ADD_CHECKLIST_SUCCESS,
  CREATE_CHECKLIST_FOLDER_ARRAY,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SELECT_CONTACT,
  SELECT_ITEM,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  USER_REQUEST,
  USER_SUCCESS
} from '../mutation-types'

jest.mock('../../api/api')

describe('actions', () => {
  test('addChecklist: commit ADD_CHECKLIST_REQUEST, ADD_CHECKLIST_SUCCESS, CREATE_CHECKLIST_FOLDER_ARRAY', async () => {
    const checklist = {
      'title': 'newList',
      'items': [
        {
          'key': 1,
          'subject': 'item one'
        },
        {
          'key': 2,
          'subject': 'Item two'
        }
      ],
      'folderName': '',
      'ownerId': '5b20bf7b08fbcb7b3c1d07e9'
    }
    const payload = checklist
    const err = { error: 'not found' }
    postChecklist.mockImplementation(calledWith => {
      return calledWith === payload
        ? Promise.resolve(payload)
        : Promise.reject(err)
    })
    const context = {
      state: {
        checklists: [
          { _id: '1', title: 'one' },
          { _id: '2', title: 'two' }
        ]
      },
      commit: jest.fn(),
      dispatch: jest.fn()
    }
    actions.addChecklist(context, payload)
    await flushPromises()

    expect(context.commit).toHaveBeenCalledTimes(3)
    expect(context.commit).toHaveBeenCalledWith(ADD_CHECKLIST_REQUEST, checklist)
    expect(context.commit).toHaveBeenCalledWith(ADD_CHECKLIST_SUCCESS, undefined)
    const checklists = context.state.checklists
    expect(context.commit).toHaveBeenLastCalledWith(CREATE_CHECKLIST_FOLDER_ARRAY, checklists)
  })
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
      commit: jest.fn(),
      dispatch: jest.fn()
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

  test('signup: commits SIGNUP_REQUEST, commits SIGNUP_SUCCESS', async () => {
    const user = {
      email: 'test@email.com',
      password: 'encrypted',
      username: 'test'
    }
    const err = {error: 'unable to post'}
    postSignup.mockImplementation(calledWith => {
      return isEqual(calledWith, user)
        ? Promise.resolve({body: user})
        : Promise.reject(err)
    })
    const context = {
      commit: jest.fn()
    }

    actions.signup(context, user)
    await flushPromises()

    expect(context.commit).toHaveBeenCalledWith(SIGNUP_REQUEST)
    expect(context.commit).toHaveBeenLastCalledWith(SIGNUP_SUCCESS, user)
  })

  test('viewItem: commits SELECT_ITEM', () => {
    const context = {
      commit: jest.fn()
    }
    actions.viewItem(context, 1)
    expect(context.commit).toBeCalledWith(SELECT_ITEM, 1)
  })

  test('viewContact: commits SELECT_CONTACT', () => {
    const context = {
      commit: jest.fn()
    }
    actions.viewContact(context, 1)
    expect(context.commit).toBeCalledWith(SELECT_CONTACT, 1)
  })
})
