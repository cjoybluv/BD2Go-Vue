import {
  createLocalVue,
  mount } from '@vue/test-utils'
import Vuex from 'vuex'
import merge from 'lodash.merge'
import ChecklistDisplay from '@/pages/ChecklistDisplay'

const localVue = createLocalVue()
localVue.use(Vuex)

function createStore (overrides) {
  const defaultStoreConfig = {
    actions: {},
    state: {
      appData: {
        checklistFolders: ['test', 'one', 'two', 'three']
      },
      language: {
        checklists: {}
      },
      checklists: [
        { _id: 1, title: 'a', folderName: '' },
        { _id: 2, title: 'b', folderName: 'two' },
        { _id: 3, title: 'c', folderName: '' }
      ],
      currentChecklist: {},
      user: {
        folders: ['testing user.folders', 'One', 'two']
      },
      contentControls: {
        checklistFolderArray: []
      },
      pageControls: {
        checklistDisplay: {}
      },
      me: {}
    }
  }
  return new Vuex.Store(
    merge(defaultStoreConfig, overrides)
  )
}

function createWrapper (overrides) {
  const defaultMountingOptions = {
    localVue,
    store: createStore()
  }
  return mount(ChecklistDisplay, merge(defaultMountingOptions, overrides))
}

describe('ChecklistDisplay', () => {
  test('component id is checklists', () => {
    const store = createStore({})
    const wrapper = createWrapper({ store })

    expect(wrapper.attributes().id).toBe('checklists')
  })
  test('FolderDisplay is mounted', () => {
    const store = createStore({})
    const wrapper = createWrapper({ store })

    expect(wrapper.find('#folderDisplay').exists()).toBe(true)
  })
  test('FolderDisplay is given User Folders', () => {
    const store = createStore({})
    const wrapper = createWrapper({ store })

    expect(wrapper.find('#folderDisplay').html()).toContain('testing user.folders')
  })
})
