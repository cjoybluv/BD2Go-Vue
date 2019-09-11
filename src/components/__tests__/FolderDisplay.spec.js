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
    propsData: {},
    store: createStore()
  }
  return shallowMount(FolderDisplay, merge(defaultMountingOptions, overrides))
}

describe('FolderDisplay', () => {
  const data = [
    { key: '1',
      itemName: 'KAYAK',
      children: [
        { key: '1-1', itemName: 'Load on Car', itemId: '8237459' },
        { key: '1-2', itemName: 'Unload car', itemId: '1231423' }
      ],
      childrenToggle: false },
    { key: '2',
      itemName: 'SKI',
      children: [
        { key: '2-1', itemName: 'load car', itemId: '293847i' }
      ],
      childrenToggle: false },
    { key: '3', itemName: 'TEST', children: [], childrenToggle: false },
    { key: '4', itemName: 'Honey Doo', children: [], childrenToggle: false, itemId: '0945674' },
    { key: '5', itemName: 'Freddies', children: [], childrenToggle: false, itemId: '23549238' }
  ]

  test('component id is folderDisplay', () => {
    const store = createStore({})
    const wrapper = createWrapper({ store })

    expect(wrapper.attributes().id).toBe('folderDisplay')
  })
  test('renders a li for each rootItem in displayData', () => {
    const store = createStore({})
    const wrapper = createWrapper({ store })

    expect(wrapper.findAll('.rootItem')).toHaveLength(5)
  })
  test('toggles caret-up/down icon for folders using childrenToggle property', () => {
    let displayData = [...data]
    const store = createStore({})
    const wrapper = createWrapper({ store })

    // initial folder closed
    expect(wrapper.find('.rootItem').html()).toContain('data-icon="caret-up"')

    // toggle 1st folder open
    displayData[0].childrenToggle = true
    wrapper.setData({displayData})
    expect(wrapper.find('.rootItem').html()).toContain('data-icon="caret-down"')

    // toggle 1st folder closed, 2nd folder open
    displayData[0].childrenToggle = false
    displayData[1].childrenToggle = true
    wrapper.setData({displayData})
    expect(wrapper.find('.rootItem').html()).toContain('data-icon="caret-up"')
    expect(wrapper.findAll('.rootItem').at(1).html()).toContain('data-icon="caret-down"')
  })
  test('renders a li for each childItem of a open folder', () => {
    let displayData = [...data]
    const store = createStore({})
    const wrapper = createWrapper({ store })

    displayData[0].childrenToggle = true
    displayData[1].childrenToggle = true
    wrapper.setData({displayData})
    expect(wrapper.findAll('.childItem')).toHaveLength(3)
  })
  test('renders a caret-right icon for childItems', () => {
    let displayData = [...data]
    const store = createStore({})
    const wrapper = createWrapper({ store })

    displayData[1].childrenToggle = true
    wrapper.setData({displayData})
    expect(wrapper.find('.childItem').html()).toContain('data-icon="caret-right"')
  })
  xtest('creates a Folder Array from items & folders props', () => {
    // const test = {
    //   folders: [ 'KAYAK', 'SKI', 'TESTING' ],
    //   items: [
    //     { _id: '79w8yer', name: 'Unload Car', folderName: 'KAYAK' },
    //     { _id: '84753', name: 'Load Car', folderName: 'SKI' },
    //     { _id: 'aidiausdf', name: 'Honey Doo', folderName: '' },
    //     { _id: '23423', name: 'Load Car', folderName: 'KAYAK' },
    //     { _id: '23423', name: 'Freddies', folderName: '' }
    //   ],
    //   folderArray: []
    // }
    // const store = createStore({})

    // const mountingOptions = {
    //   localVue,
    //   propsData: {
    //     folders: test.folders,
    //     items: test.items
    //   },
    //   store: createStore()
    // }
    // const wrapper = shallowMount(FolderDisplay, merge(mountingOptions, store))

    // expect(wrapper)
  })
})
