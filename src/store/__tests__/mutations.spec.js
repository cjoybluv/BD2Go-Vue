import mutations from '../mutations'
import {
  ADD_CHECKLIST_ITEM,
  ADD_CHECKLIST_REQUEST,
  ADD_CHECKLIST_SUCCESS,
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
