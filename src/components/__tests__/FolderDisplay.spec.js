import {
  createLocalVue,
  shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import merge from 'lodash.merge'
import FolderDisplay from '@/components/FolderDisplay'

const localVue = createLocalVue()
localVue.use(Vuex)

function createStore (overrides) {
  const defaultStoreConfig = {
    actions: {},
    state: {}
  }
  return new Vuex.Store(
    merge(defaultStoreConfig, overrides)
  )
}

function createWrapper (overrides) {
  const defaultMountingOptions = {
    localVue,
    propsData: {
      folders: testFolders,
      items: testItems
    },
    store: createStore()
  }
  return shallowMount(FolderDisplay, merge(defaultMountingOptions, overrides))
}

describe('FolderDisplay', () => {
  test('component id is folderDisplay', () => {
    const store = createStore({})
    const wrapper = createWrapper({ store })

    expect(wrapper.attributes().id).toBe('folderDisplay')
  })
  test('renders a li for each rootItem in displayData', () => {
    const store = createStore({})
    const wrapper = createWrapper({ store })

    expect(wrapper.findAll('.rootItem')).toHaveLength(6)
  })
  test('toggles caret-up/down icon for folders using childrenToggle property', () => {
    let displayData = [...testDisplayData]
    const store = createStore({})
    const wrapper = createWrapper({ store })

    // initial folder closed
    expect(wrapper.find('.rootItem').html()).toContain('data-icon="caret-up"')

    // toggle 1st folder open
    displayData[0].childrenToggle = true
    wrapper.setData({displayData})
    expect(wrapper.find('.rootItem').html()).toContain('data-icon="caret-down"')

    // // toggle 1st folder closed, 2nd folder open
    displayData[0].childrenToggle = false
    displayData[1].childrenToggle = true
    wrapper.setData({displayData})
    expect(wrapper.find('.rootItem').html()).toContain('data-icon="caret-up"')
    expect(wrapper.findAll('.rootItem').at(1).html()).toContain('data-icon="caret-down"')
  })
  test('renders a li for each childItem of a open folder', () => {
    let displayData = [...testDisplayData]
    const store = createStore({})
    const wrapper = createWrapper({ store })

    displayData[0].childrenToggle = true
    displayData[1].childrenToggle = true
    wrapper.setData({displayData})
    expect(wrapper.findAll('.childItem')).toHaveLength(4)
  })
  test('renders a caret-right icon for childItems', () => {
    let displayData = [...testDisplayData]
    const store = createStore({})
    const wrapper = createWrapper({ store })

    displayData[1].childrenToggle = true
    wrapper.setData({displayData})
    expect(wrapper.find('.childItem').html()).toContain('data-icon="caret-right"')
  })
})

const testFolders = ['KAYAK', 'SKI', 'SHOPPING', 'TEST', 'testing']

const testItems = [{'_id': '5d79e0507863eb3cebce1f06', 'name': '2019-9-11 23:5:56 / DAVE', 'folderName': 'TEST'}, {'_id': '5d71e1ea8593b8801dce1687', 'name': '2019-9-5 21:34:45 / DAVE', 'folderName': 'TEST'}, {'_id': '5d69a37240d938e28738fe84', 'name': 'DAVE', 'folderName': '__vue_devtool_undefined__'}, {'_id': '5d6a1e196ece72f4fafd6a03', 'name': 'Freddies', 'folderName': 'SHOPPING'}, {'_id': '5d69a40040d938e28738fe87', 'name': 'GeoFetching', 'folderName': 'TEST'}, {'_id': '5d698b5d40d938e28738fe64', 'name': 'Launch', 'folderName': 'KAYAK'}, {'_id': '5d672266f130b48a9e862103', 'name': 'Load on Car', 'folderName': 'KAYAK'}, {'_id': '5d7729e07863eb3cebce1ef9', 'name': 'Pack Car', 'folderName': 'SKI'}, {'_id': '5d67402f946a6abba5d24f93', 'name': 'Unload Car', 'folderName': 'KAYAK'}]

const testDisplayData = [
  {
    'key': 0,
    'itemName': 'KAYAK',
    'children': [
      {
        'key': 10,
        'itemName': 'Launch',
        'children': [

        ],
        'childrenToggle': false,
        'folder': false,
        'itemId': '5d698b5d40d938e28738fe64'
      },
      {
        'key': 11,
        'itemName': 'Load on Car',
        'children': [

        ],
        'childrenToggle': false,
        'folder': false,
        'itemId': '5d672266f130b48a9e862103'
      },
      {
        'key': 13,
        'itemName': 'Unload Car',
        'children': [

        ],
        'childrenToggle': false,
        'folder': false,
        'itemId': '5d67402f946a6abba5d24f93'
      }
    ],
    'childrenToggle': false,
    'folder': true,
    'itemId': null
  },
  {
    'key': 2,
    'itemName': 'SHOPPING',
    'children': [
      {
        'key': 8,
        'itemName': 'Freddies',
        'children': [

        ],
        'childrenToggle': false,
        'folder': false,
        'itemId': '5d6a1e196ece72f4fafd6a03'
      }
    ],
    'childrenToggle': false,
    'folder': true,
    'itemId': null
  },
  {
    'key': 1,
    'itemName': 'SKI',
    'children': [
      {
        'key': 12,
        'itemName': 'Pack Car',
        'children': [

        ],
        'childrenToggle': false,
        'folder': false,
        'itemId': '5d7729e07863eb3cebce1ef9'
      }
    ],
    'childrenToggle': false,
    'folder': true,
    'itemId': null
  },
  {
    'key': 3,
    'itemName': 'TEST',
    'children': [
      {
        'key': 5,
        'itemName': '2019-9-11 23:5:56 / DAVE',
        'children': [

        ],
        'childrenToggle': false,
        'folder': false,
        'itemId': '5d79e0507863eb3cebce1f06'
      },
      {
        'key': 6,
        'itemName': '2019-9-5 21:34:45 / DAVE',
        'children': [

        ],
        'childrenToggle': false,
        'folder': false,
        'itemId': '5d71e1ea8593b8801dce1687'
      },
      {
        'key': 9,
        'itemName': 'GeoFetching',
        'children': [

        ],
        'childrenToggle': false,
        'folder': false,
        'itemId': '5d69a40040d938e28738fe87'
      }
    ],
    'childrenToggle': false,
    'folder': true,
    'itemId': null
  },
  {
    'key': 4,
    'itemName': 'testing',
    'children': [

    ],
    'childrenToggle': false,
    'folder': true,
    'itemId': null
  },
  {
    'key': 7,
    'itemName': 'DAVE',
    'children': [

    ],
    'childrenToggle': false,
    'folder': false,
    'itemId': '5d69a37240d938e28738fe84'
  }
]
