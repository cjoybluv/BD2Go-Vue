import mutations from '../mutations'
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
  CLEAR_CURRENT_CHECKLIST,
  CONTACT_REQUEST,
  CONTACT_SUCCESS,
  CONTACTS_REQUEST,
  CONTACTS_SUCCESS,
  CREATE_CHECKLIST_FOLDER_ARRAY,
  CREATE_CHECKLIST_FOLDER_REQUEST,
  CREATE_CHECKLIST_FOLDER_SUCCESS,
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
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  USER_REQUEST,
  USER_SUCCESS,
  SELECT_ITEM,
  SELECT_CONTACT
} from '../mutation-types'

const literallyJustDateNow = () => Date.now()

describe('mutations', () => {
  test('ADD_CHECKLIST_ITEM appends an item to currentChecklist', () => {
    const state = {
      currentChecklist: {
        items: ['one', 'two']
      }
    }
    const payload = {
      key: 3,
      subject: 'three'
    }
    mutations[ADD_CHECKLIST_ITEM](state, payload)
    expect(state.currentChecklist).toEqual({
      items: ['one', 'two', {key: 3, subject: 'three'}]
    })
  })
  test('ADD_CHECKLIST_REQUEST set loading to true', () => {
    const state = {
      loading: false
    }
    const checklist = {}
    mutations[ADD_CHECKLIST_REQUEST](state, checklist)
    expect(state.loading).toEqual(true)
  })
  test('ADD_CHECKLIST_SUCCESS: appends checklist, clears loading, currentChecklist, moveEnabled', () => {
    const state = {
      checklists: [
        {
          title: 'Existing Checklist'
        }
      ],
      loading: true,
      currentChecklist: {
        title: 'New Checklist'
      },
      pageControls: {
        checklistDisplay: {
          moveEnabled: true
        }
      }
    }
    const checklist = state.currentChecklist
    mutations[ADD_CHECKLIST_SUCCESS](state, checklist)

    expect(state.checklists.length).toBe(2)
    expect(state.checklists[1]).toEqual(checklist)
    expect(state.loading).toBe(false)
    expect(state.currentChecklist).toEqual({
      title: '',
      items: []
    })
    expect(state.pageControls.checklistDisplay.moveEnabled).toBe(false)
  })
  test('ADD_CONTACT_REQUEST set loading to true', () => {
    const state = {
      loading: false
    }
    const contact = {}
    mutations[ADD_CONTACT_REQUEST](state, contact)
    expect(state.loading).toEqual(true)
  })
  test('ADD_CONTACT_SUCCESS, appends contact, resets selectedId, loading, selectedContactId', () => {
    const state = {
      contacts: [
        {
          name: 'Al'
        }
      ],
      loading: true,
      contentControls: {
        selectedContactId: null,
        selectedItemId: 29379283
      }
    }
    const contact = {
      _id: 123,
      name: 'Bob'
    }
    mutations[ADD_CONTACT_SUCCESS](state, contact)

    expect(state.contacts.length).toBe(2)
    expect(state.contacts[1]).toEqual(contact)
    expect(state.loading).toBe(false)
    expect(state.contentControls.selectedItemId).toBe(null)
    expect(state.contentControls.selectedContactId).toBe(123)
  })
  test('ADD_LOCATION_REQUEST set loading to true', () => {
    const state = {
      loading: false
    }
    const contact = {}
    mutations[ADD_LOCATION_REQUEST](state, contact)
    expect(state.loading).toEqual(true)
  })
  test('ADD_LOCATION_SUCCESS, appends location, resets loading', () => {
    const state = {
      locations: [
        {
          placename: 'Starbucks'
        }
      ],
      loading: true
    }
    const location = {
      _id: 123,
      placename: 'Wendys'
    }
    mutations[ADD_LOCATION_SUCCESS](state, location)

    expect(state.locations.length).toBe(2)
    expect(state.locations[1]).toEqual(location)
    expect(state.loading).toBe(false)
  })
  test('APP_DATA_REQUEST, clear appData[key], set loading', () => {
    const state = {
      loading: false,
      appData: {
        someKey: 'someValue'
      }
    }
    const key = 'requestKey'
    mutations[APP_DATA_REQUEST](state, key)

    expect(state.appData[key]).toBe(null)
    expect(state.loading).toBe(true)
  })
  test('APP_DATA_SUCCESS, clear loading, set appData', () => {
    const state = {
      loading: true,
      appData: {
        requestKey: null
      }
    }
    const appData = {
      key: 'requestKey',
      data: { field1: 'some', field2: 'data' }
    }
    mutations[APP_DATA_SUCCESS](state, appData)

    expect(state.loading).toBe(false)
    expect(state.appData[appData.key]).toEqual(appData.data)
  })
  test('CHECKLISTS_REQUEST, clear checklists, set loading', () => {
    const state = {
      checklists: ['one', 'two'],
      loading: false
    }
    const ownerId = '123'
    mutations[CHECKLISTS_REQUEST](state, ownerId)

    expect(state.checklists).toEqual([])
    expect(state.loading).toBe(true)
  })
  test('CHECKLISTS_SUCCESS, set checklists, clear loading', () => {
    const state = {
      loading: true,
      checklists: []
    }
    const checklists = [
      { _id: 1, title: 'one' },
      { _id: 2, title: 'two' }
    ]
    mutations[CHECKLISTS_SUCCESS](state, checklists)

    expect(state.checklists).toEqual(checklists)
    expect(state.loading).toBe(false)
  })
  test('CLEAR_CURRENT_CHECKLIST, clear currentCheclist', () => {
    const state = {
      currentChecklist: { title: 'Checklist' }
    }
    mutations[CLEAR_CURRENT_CHECKLIST](state)

    expect(state.currentChecklist).toEqual({
      title: '',
      items: []
    })
  })
  test('CONTACT_REQUEST, set loading', () => {
    const state = {
      loading: false
    }
    mutations[CONTACT_REQUEST](state)

    expect(state.loading).toBe(true)
  })
  test('CONTACT_SUCCESS, clear loading', () => {
    const state = {
      loading: true
    }
    mutations[CONTACT_SUCCESS](state)

    expect(state.loading).toBe(false)
  })
  test('CONTACTS_REQUEST, clear contacts, set loading', () => {
    const state = {
      contacts: [
        { id: 1, name: 'Al' },
        { id: 2, name: 'Bob' }
      ],
      loading: false
    }
    const ownerId = '123'
    mutations[CONTACTS_REQUEST](state, ownerId)

    expect(state.contacts).toEqual([])
    expect(state.loading).toBe(true)
  })
  test('CONTACTS_SUCCESS, set contacts, clear loading', () => {
    const state = {
      contacts: [],
      loading: true
    }
    const contacts = [
      { id: 1, name: 'Al' },
      { id: 2, name: 'Bob' }
    ]
    mutations[CONTACTS_SUCCESS](state, contacts)

    expect(state.contacts).toEqual(contacts)
    expect(state.loading).toBe(false)
  })
  test('CREATE_CHECKLIST_FOLDER_ARRAY, integrate folders & checklists, then sort', () => {
    const state = {
      appData: {
        checklistFolders: [ 'ONE', 'TWO' ]
      },
      contentControls: {
        checklistFolderArray: []
      }
    }
    const checklists = [
      { _id: 1, title: 'ZZ One-1', folderName: 'ONE' },
      { _id: 2, title: 'Two-2', folderName: 'TWO' },
      { _id: 3, title: '3' },
      { _id: 4, title: 'One-4', folderName: 'ONE' }
    ]
    mutations[CREATE_CHECKLIST_FOLDER_ARRAY](state, checklists)

    expect(state.contentControls.checklistFolderArray).toEqual(
      [{'folder': true, 'items': [{'_id': 1, 'folderName': 'ONE', 'title': 'ZZ One-1'}, {'_id': 4, 'folderName': 'ONE', 'title': 'One-4'}], 'key': 0, 'title': 'ONE'}, {'folder': true, 'items': [{'_id': 2, 'folderName': 'TWO', 'title': 'Two-2'}], 'key': 1, 'title': 'TWO'}, {'_rec': {'_id': 3, 'title': '3'}, 'folder': false, 'key': 2, 'title': '3'}]
    )
  })
  test('CREATE_CHECKLIST_FOLDER_REQUEST, set loading', () => {
    const state = {
      loading: false
    }
    const folderName = 'TEST'
    mutations[CREATE_CHECKLIST_FOLDER_REQUEST](state, folderName)

    expect(state.loading).toBe(true)
  })
  test('CREATE_CHECKLIST_FOLDER_SUCCESS, clear loading, append foldername to appData', () => {
    const state = {
      loading: true,
      appData: {
        checklistFolders: [ 'ONE', 'TWO' ]
      }
    }
    const folderName = 'TEST'
    mutations[CREATE_CHECKLIST_FOLDER_SUCCESS](state, folderName)

    expect(state.loading).toBe(false)
    expect(state.appData.checklistFolders.length).toBe(3)
    expect(state.appData.checklistFolders[2]).toBe(folderName)
  })
  test('EDIT_CHECKLIST, master? create new checklist with DateTime title : set currentChecklist', () => {
    let state = {
      currentChecklist: null
    }
    let checklist = {
      _id: '1',
      masterChecklist: true,
      title: 'Testing'
    }

    const realDateNow = Date.now.bind(global.Date)
    const dateNowStub = jest.fn(() => 1530518207007)
    global.Date.now = dateNowStub

    let today = new Date(Date.now())
    let titleDateTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()

    mutations[EDIT_CHECKLIST](state, checklist)

    expect(state.currentChecklist).toEqual({
      masterChecklist: false,
      sourceMasterId: checklist._id,
      title: titleDateTime + ' / ' + checklist.title
    })

    global.Date.now = realDateNow

    state = {
      currentChecklist: null
    }
    checklist = {
      _id: '1',
      masterChecklist: false,
      title: 'Testing'
    }
    mutations[EDIT_CHECKLIST](state, checklist)

    expect(state.currentChecklist).toEqual(checklist)
  })
  test('EDIT_CONTACT_COMPLETE, clear editContact', () => {
    const state = {
      contentControls: {
        editContact: { _id: 1, name: 'Al' }
      }
    }
    mutations[EDIT_CONTACT_COMPLETE](state)

    expect(state.contentControls.editContact).toBe(null)
  })
  test('EDIT_CONTACT_REQUEST, set editContact w/ pronoun', () => {
    const state = {
      contentControls: {
        editContact: null
      }
    }
    const contact = {
      _id: 1,
      name: 'Al'
    }
    mutations[EDIT_CONTACT_REQUEST](state, contact)

    expect(state.contentControls.editContact).toEqual({
      pronoun: 'null',
      _id: 1,
      name: 'Al'
    })
  })
  test('EDIT_LOCATION_COMPLETE, clear editLocation', () => {
    const state = {
      contentControls: {
        editLocation: { _id: 1, placename: 'Starbucks' }
      }
    }
    mutations[EDIT_LOCATION_COMPLETE](state)

    expect(state.contentControls.editLocation).toBe(null)
  })
  test('EDIT_LOCATION_REQUEST, set editLocation w/ pronoun', () => {
    const state = {
      contentControls: {
        editLocation: null
      }
    }
    const location = {
      _id: 1,
      placename: 'Starbucks'
    }
    mutations[EDIT_LOCATION_REQUEST](state, location)

    expect(state.contentControls.editLocation).toEqual(location)
  })
  test('ITEMS_REQUEST, clear items, set loading ', () => {
    const state = {
      items: [
        { _id: 1, subject: 'one' },
        { _id: 2, subject: 'two' }
      ],
      loading: false
    }
    const ownerId = '123'
    mutations[ITEMS_REQUEST](state, ownerId)

    expect(state.items).toEqual([])
    expect(state.loading).toBe(true)
  })
  test('ITEMS_SUCCESS, set items, clear loading', () => {
    const state = {
      items: [],
      loading: true
    }
    const items = [
      { _id: 1, subject: 'one' },
      { _id: 2, subject: 'two' }
    ]
    mutations[ITEMS_SUCCESS](state, items)

    expect(state.items).toEqual(items)
    expect(state.loading).toBe(false)
  })
  test('LOCATIONS_REQUEST, clear locations, set loading ', () => {
    const state = {
      locations: [
        { _id: 1, placename: 'starbucks' },
        { _id: 2, placename: 'lambs' }
      ],
      loading: false
    }
    const ownerId = '123'
    mutations[LOCATIONS_REQUEST](state, ownerId)

    expect(state.locations).toEqual([])
    expect(state.loading).toBe(true)
  })
  test('LOCATIONS_SUCCESS, set locations, clear loading', () => {
    const state = {
      locations: [],
      loading: true
    }
    const locations = [
      { _id: 1, placename: 'starbucks' },
      { _id: 2, placename: 'lambs' }
    ]
    mutations[LOCATIONS_SUCCESS](state, locations)

    expect(state.locations).toEqual(locations)
    expect(state.loading).toBe(false)
  })
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
    expect(localStorage.setItem).toBeCalledWith('token', 'xyz')
    expect(localStorage.__STORE__['token']).toBe('xyz')
    expect(localStorage.setItem).toHaveBeenLastCalledWith('user', JSON.stringify('dave'))
    expect(localStorage.__STORE__['user']).toBe(JSON.stringify('dave'))
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
