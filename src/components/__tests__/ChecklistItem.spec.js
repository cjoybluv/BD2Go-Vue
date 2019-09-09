import {
  createLocalVue,
  shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import merge from 'lodash.merge'
import ChecklistItem from '@/components/ChecklistItem'
// import bFormCheckbox from 'bootstrap-vue/src/components/form-checkbox/form-checkbox'

const localVue = createLocalVue()
localVue.use(Vuex)

function createStore (overrides) {
  const defaultStoreConfig = {
    actions: {},
    state: {
      moveEnabled: false
    }
  }
  return new Vuex.Store(
    merge(defaultStoreConfig, overrides)
  )
}

function createWrapper (overrides) {
  const defaultMountingOptions = {
    localVue,
    propsData: {
      item: {
        key: 1,
        subject: 'one',
        completed: false
      }
    },
    store: createStore()
  }
  return shallowMount(ChecklistItem, merge(defaultMountingOptions, overrides))
}

describe('ChecklistItem', () => {
  test('component id is item', () => {
    const store = createStore({})
    const wrapper = createWrapper({ store })

    expect(wrapper.attributes().id).toBe('checklistItem')
  })
  test('renders an Item Completed checkbox', () => {
    const store = createStore({})
    let wrapper = createWrapper({ store })

    expect(wrapper.contains('#completed')).toBe(true)

    let checkbox = wrapper.find('[type="checkbox"]')

    expect(checkbox.vnode.data.domProps.checked).toBe(false)

    const mountingOptions = {
      localVue,
      propsData: {
        item: {
          key: 2,
          subject: 'two',
          completed: true
        }
      },
      store: createStore()
    }
    wrapper = shallowMount(ChecklistItem, merge(mountingOptions, store))
    checkbox = wrapper.find('[type="checkbox"]')

    expect(checkbox.vnode.data.domProps.checked).toBe(true)
  })
  test('renders the Item Subject', () => {
    const store = createStore({})
    const wrapper = createWrapper({ store })

    expect(wrapper.contains('#subject')).toBe(true)
    expect(wrapper.html()).toContain('one')
  })
  test('renders a Ellipsis-V icon', () => {
    const store = createStore({})
    const wrapper = createWrapper({ store })

    expect(wrapper.contains('#more')).toBe(true)
    expect(wrapper.find('svg').html()).toContain('data-icon="ellipsis-v"')
  })
  test('renders a dropdown menu', () => {
    const store = createStore({})
    const wrapper = createWrapper({ store })

    expect(wrapper.find('[role="menu"]').classes()).toContain('dropdown-menu')
  })
  test('renders a dropdown menu item of Set a Date', () => {
    const store = createStore({})
    const wrapper = createWrapper({ store })

    expect(wrapper.find('[role="menuitem"]').text()).toBe('Set a Date')
  })
  test('renders a dropdown menu item of Add an Attachment', () => {
    const store = createStore({})
    const wrapper = createWrapper({ store })

    expect(wrapper.findAll('[role="menuitem"]').at(1).text()).toBe('Add an Attachment')
  })
  test('renders a text-area when Subject is hovered & move not enabled', () => {
    const store = createStore({
      state: {
        pageControls: {
          checklistDisplay: {
            moveEnabled: false
          }
        }
      }
    })
    const wrapper = createWrapper({ store })

    wrapper.setData({
      hover: true
    })

    expect(wrapper.html()).toContain('<textarea')
  })
  test('does not render a text-area when Subject is hovered & move is enabled', () => {
    const store = createStore({
      state: {
        pageControls: {
          checklistDisplay: {
            moveEnabled: true
          }
        }
      }
    })
    const wrapper = createWrapper({ store })

    wrapper.setData({
      hover: true
    })

    expect(wrapper.html()).not.toContain('<textarea')
  })
})

// BASE STATE
// '<div id="item"><div id="completed"><div class="custom-control custom-checkbox custom-control-inline"><input id="__BVID__2" type="checkbox" autocomplete="off" true-value="true" class="custom-control-input" value="true"><label for="__BVID__2" class="custom-control-label"></label></div></div> <div id="subject"><span>one</span> <!----></div> <div id="more"><div id="__BVID__3" class="btn-group b-dropdown dropdown"><!----><button id="__BVID__3__BV_toggle_" aria-haspopup="true" aria-expanded="false" type="button" class="btn btn-link"><svg aria-hidden="true" data-prefix="fas" data-icon="ellipsis-v" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" class="pointer svg-inline--fa fa-ellipsis-v fa-w-6"><path fill="currentColor" d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z" class=""></path></svg></button><div role="menu" aria-labelledby="__BVID__3__BV_toggle_" class="dropdown-menu dropdown-menu-right"> <a role="menuitem" href="#" target="_self" class="dropdown-item">Set a Date</a> <a role="menuitem" href="#" target="_self" class="dropdown-item">Add an Attachment</a></div></div></div></div>'

// SUBJECT IN HOVER
// "<div id=\"checklistItem\"><div id=\"completed\"><div class=\"custom-control custom-checkbox custom-control-inline\"><input id=\"__BVID__62\" type=\"checkbox\" autocomplete=\"off\" true-value=\"true\" class=\"custom-control-input\" value=\"true\"><label for=\"__BVID__62\" class=\"custom-control-label\"></label></div></div> <div id=\"subject\"><!----> <textarea id=\"__BVID__64\" rows=\"1\" wrap=\"soft\" class=\"form-control\"></textarea></div> <div id=\"more\"><div id=\"__BVID__63\" class=\"btn-group b-dropdown dropdown\"><!----><button id=\"__BVID__63__BV_toggle_\" aria-haspopup=\"true\" aria-expanded=\"false\" type=\"button\" class=\"btn btn-link\"><svg aria-hidden=\"true\" data-prefix=\"fas\" data-icon=\"ellipsis-v\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 192 512\" class=\"pointer svg-inline--fa fa-ellipsis-v fa-w-6\"><path fill=\"currentColor\" d=\"M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z\" class=\"\"></path></svg></button><div role=\"menu\" aria-labelledby=\"__BVID__63__BV_toggle_\" class=\"dropdown-menu dropdown-menu-right\"> <a role=\"menuitem\" href=\"#\" target=\"_self\" class=\"dropdown-item\">Set a Date</a> <a role=\"menuitem\" href=\"#\" target=\"_self\" class=\"dropdown-item\">Add an Attachment</a></div></div></div></div>"
