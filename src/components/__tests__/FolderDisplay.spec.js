import {
  createLocalVue,
  shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import merge from 'lodash.merge'
import FolderDisplay from '@/components/FolderDisplay'
// import bFormCheckbox from 'bootstrap-vue/src/components/form-checkbox/form-checkbox'

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
  test('renders a caret-down icon for rootItems', () => {
    const store = createStore({})
    const wrapper = createWrapper({ store })

    expect(wrapper.find('.rootItem').html()).toContain('data-icon="caret-down"')
  })
  test('renders a li for each childItem of a rootItem', () => {
    const store = createStore({})
    const wrapper = createWrapper({ store })

    expect(wrapper.findAll('.childItem')).toHaveLength(3)
  })
  test('renders a caret-right icon for childItems', () => {
    const store = createStore({})
    const wrapper = createWrapper({ store })

    expect(wrapper.find('.childItem').html()).toContain('data-icon="caret-right"')
  })
})

// const displayData = [
//   { key: '1',
//     itemName: 'KAYAK',
//     children: [
//       { key: '1-1', itemName: 'Load on Car', itemId: '8237459' },
//       { key: '1-2', itemName: 'Unload car', itemId: '1231423' }
//     ] },
//   { key: '2', itemName: 'SKI', children: [] },
//   { key: '3', itemName: 'TEST', children: [] },
//   { key: '4', itemName: 'Honey Doo', children: [], itemId: '0945674' },
//   { key: '5', itemName: 'Freddies', children: [], itemId: '23549238' }
// ]
