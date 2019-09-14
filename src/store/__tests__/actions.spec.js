import flushPromises from 'flush-promises'
import isEqual from 'lodash.isequal'

import actions from '../actions'
import {
  getAppData,
  getChecklists,
  getContact,
  getContacts,
  getItems,
  getLocations,
  getUser,
  postChecklist,
  postContact,
  postLocation,
  postLogin,
  postSignup,
  putChecklist,
  putContact,
  putUser
} from '../../api/api'
import {
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
  ITEMS_REQUEST,
  ITEMS_SUCCESS,
  LOCATIONS_REQUEST,
  LOCATIONS_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SELECT_CONTACT,
  SELECT_ITEM,
  SET_ME,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  UPDATE_CHECKLIST_REQUEST,
  UPDATE_CHECKLIST_SUCCESS,
  UPDATE_CONTACT_REQUEST,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  USER_REQUEST,
  USER_SUCCESS
} from '../mutation-types'

jest.mock('../../api/api')

describe('actions', () => {
  test('addChecklist: commit ADD_CHECKLIST_REQUEST, ADD_CHECKLIST_SUCCESS', async () => {
    const payload = {
      body: {
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
    }
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
      commit: jest.fn()
    }
    actions.addChecklist(context, payload)
    await flushPromises()

    expect(context.commit).toHaveBeenCalledTimes(2)
    expect(context.commit).toHaveBeenCalledWith(ADD_CHECKLIST_REQUEST, payload)
    expect(context.commit).toHaveBeenCalledWith(ADD_CHECKLIST_SUCCESS, payload.body)
  })
  test('addContact: commmit ADD_CONTACT_REQUEST, ADD_CONTACT_SUCCESS', async () => {
    const payload = {
      body: {
        'ownerId': '5b20bf7b08fbcb7b3c1d07e9',
        'name': 'Suzanne Stevens'
      }
    }
    const err = { error: 'not found' }
    postContact.mockImplementation(calledWith => {
      return calledWith === payload
        ? Promise.resolve(payload)
        : Promise.reject(err)
    })
    const context = {
      commit: jest.fn()
    }
    actions.addContact(context, payload)
    await flushPromises()

    expect(context.commit).toHaveBeenCalledTimes(2)
    expect(context.commit).toHaveBeenCalledWith(ADD_CONTACT_REQUEST, payload)
    expect(context.commit).toHaveBeenLastCalledWith(ADD_CONTACT_SUCCESS, payload.body)
  })
  test('addLocation: commmit ADD_LOCATION_REQUEST, ADD_LOCATION_SUCCESS', async () => {
    const payload = {
      body: {
        'ownerId': '5b20bf7b08fbcb7b3c1d07e9',
        'name': 'Starbucks',
        'street': '123 Main St',
        'city': 'Hillsboro',
        'st': 'OR',
        'zip': '97123'
      }
    }
    const err = { error: 'not found' }
    postLocation.mockImplementation(calledWith => {
      return calledWith === payload
        ? Promise.resolve(payload)
        : Promise.reject(err)
    })
    const context = {
      commit: jest.fn()
    }
    actions.addLocation(context, payload)
    await flushPromises()

    expect(context.commit).toHaveBeenCalledTimes(2)
    expect(context.commit).toHaveBeenCalledWith(ADD_LOCATION_REQUEST, payload)
    expect(context.commit).toHaveBeenLastCalledWith(ADD_LOCATION_SUCCESS, payload.body)
  })
  test('fetchAppData: commits APP_DATA_REQUEST, APP_DATA_SUCCESS', async () => {
    const payload = 'someAppKey'
    const data = {
      body: {}
    }
    const err = {}
    getAppData.mockImplementation(calledWith => {
      return calledWith === payload
        ? Promise.resolve(data)
        : Promise.reject(err)
    })
    const context = {
      commit: jest.fn()
    }
    actions.fetchAppData(context, payload)
    await flushPromises()

    expect(context.commit).toHaveBeenCalledTimes(2)
    expect(context.commit).toHaveBeenCalledWith(APP_DATA_REQUEST, payload)
    expect(context.commit).toHaveBeenLastCalledWith(APP_DATA_SUCCESS, data.body)
  })
  test('fetchChecklists: commits CHECKLISTS_REQUEST/SUCCESS', async () => {
    const payload = 'someOwnerId'
    const data = {
      body: []
    }
    const err = {}
    getChecklists.mockImplementation(calledWith => {
      return calledWith === payload
        ? Promise.resolve(data)
        : Promise.reject(err)
    })
    const context = {
      commit: jest.fn()
    }
    actions.fetchChecklists(context, payload)
    await flushPromises()

    expect(context.commit).toHaveBeenCalledTimes(2)
    expect(context.commit).toHaveBeenCalledWith(CHECKLISTS_REQUEST, payload)
    expect(context.commit).toHaveBeenCalledWith(CHECKLISTS_SUCCESS, data.body)
  })
  test('fetchContacts: commits CONTACTS_REQUEST / SUCCESS', async () => {
    const payload = 'someOwnerId'
    const data = {
      body: []
    }
    const err = {}
    getContacts.mockImplementation(calledWith => {
      return calledWith === payload
        ? Promise.resolve(data)
        : Promise.reject(err)
    })
    const context = {
      commit: jest.fn()
    }
    actions.fetchContacts(context, payload)
    await flushPromises()

    expect(context.commit).toHaveBeenCalledTimes(2)
    expect(context.commit).toHaveBeenCalledWith(CONTACTS_REQUEST, payload)
    expect(context.commit).toHaveBeenLastCalledWith(CONTACTS_SUCCESS, data.body)
  })
  test('fetchItems: commits ITEMS_REQUEST / SUCCESS', async () => {
    const payload = 'someOwnerId'
    const data = {
      body: []
    }
    const err = {}
    getItems.mockImplementation(calledWith => {
      return calledWith === payload
        ? Promise.resolve(data)
        : Promise.reject(err)
    })
    const context = {
      commit: jest.fn()
    }
    actions.fetchItems(context, payload)
    await flushPromises()

    expect(context.commit).toHaveBeenCalledTimes(2)
    expect(context.commit).toHaveBeenCalledWith(ITEMS_REQUEST, payload)
    expect(context.commit).toHaveBeenLastCalledWith(ITEMS_SUCCESS, data.body)
  })
  test('fetchLocations: commits LOCATIONS_REQUEST / SUCCESS', async () => {
    const payload = 'someOwnerId'
    const data = {
      body: []
    }
    const err = {}
    getLocations.mockImplementation(calledWith => {
      return calledWith === payload
        ? Promise.resolve(data)
        : Promise.reject(err)
    })
    const context = {
      commit: jest.fn()
    }
    actions.fetchLocations(context, payload)
    await flushPromises()

    expect(context.commit).toHaveBeenCalledTimes(2)
    expect(context.commit).toHaveBeenCalledWith(LOCATIONS_REQUEST, payload)
    expect(context.commit).toHaveBeenLastCalledWith(LOCATIONS_SUCCESS, data.body)
  })
  test('fetchMe: commits CONTACT_REQUEST / SUCCESS, SET_ME', async () => {
    const payload = 'someContactId'
    const data = {
      body: {}
    }
    const err = {}
    getContact.mockImplementation(calledWith => {
      return calledWith === payload
        ? Promise.resolve(data)
        : Promise.reject(err)
    })
    const context = {
      commit: jest.fn()
    }
    actions.fetchMe(context, payload)
    await flushPromises()

    expect(context.commit).toHaveBeenCalledTimes(3)
    expect(context.commit).toHaveBeenCalledWith(CONTACT_REQUEST, payload)
    expect(context.commit).toHaveBeenCalledWith(CONTACT_SUCCESS, data.body)
    expect(context.commit).toHaveBeenLastCalledWith(SET_ME, data.body)
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
    const payload = user.body.email
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
  test('updateChecklist: commits UPDATE_CHECKLIST_REQUEST / SUCCESS', async () => {
    const payload = {
      title: 'An Updated Checklist'
    }
    const data = {
      body: {}
    }
    const err = {}
    putChecklist.mockImplementation(calledWith => {
      return calledWith === payload
        ? Promise.resolve(data)
        : Promise.reject(err)
    })
    const context = {
      commit: jest.fn(),
      state: {
        checklists: []
      }
    }
    actions.updateChecklist(context, payload)
    await flushPromises()

    expect(context.commit).toHaveBeenCalledTimes(2)
    expect(context.commit).toHaveBeenCalledWith(UPDATE_CHECKLIST_REQUEST, payload)
    expect(context.commit).toHaveBeenCalledWith(UPDATE_CHECKLIST_SUCCESS, data.body)
  })
  test('updateContact: commits UPDATE_CONTACT_REQUEST / SUCCESS', async () => {
    const payload = {
      _id: '23423',
      name: 'Updated Contact'
    }
    const data = {
      body: {
        _id: '23423',
        name: 'Updated Contact',
        relationships: []
      }
    }
    const err = {}
    const updatedContact = data.body
    getContact.mockImplementation(calledWith => {
      return calledWith === payload._id
        ? Promise.resolve(data)
        : Promise.reject(err)
    })
    putContact.mockImplementation(calledWith => {
      return calledWith === payload
        ? Promise.resolve(data)
        : Promise.reject(err)
    })
    // postSetRelationship logic TO BE DONE
    const context = {
      commit: jest.fn(),
      state: {
        appData: {
          relationshipData: []
        }
      }
    }
    actions.updateContact(context, payload)
    await flushPromises()

    expect(context.commit).toHaveBeenCalledTimes(2)
    expect(context.commit).toHaveBeenCalledWith(UPDATE_CONTACT_REQUEST, payload)
    expect(context.commit).toHaveBeenLastCalledWith(UPDATE_CONTACT_SUCCESS, updatedContact)
  })
  test('updateUser: commits UPDATE_USER_REQUEST / SUCCESS', async () => {
    const payload = {
      name: 'updated user'
    }
    const data = {
      body: {}
    }
    const err = {}
    putUser.mockImplementation(calledWith => {
      return calledWith === payload
        ? Promise.resolve(data)
        : Promise.reject(err)
    })
    const context = {
      commit: jest.fn()
    }
    actions.updateUser(context, payload)
    await flushPromises()

    expect(context.commit).toHaveBeenCalledTimes(2)
    expect(context.commit).toHaveBeenCalledWith(UPDATE_USER_REQUEST, payload)
    expect(context.commit).toHaveBeenLastCalledWith(UPDATE_USER_SUCCESS, data.body)
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
