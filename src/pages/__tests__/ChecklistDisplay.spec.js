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

{ /* <div id="checklists"><h1></h1> <section id="main"><div class="panel"><md-list></md-list></div> <div class="panel"><section id="checklist"><div id="titleLine"><input id="checklistTitle" type="text" placeholder="Enter New Checklist Title" class="form-control"> <span class="notAllowed"><svg aria-hidden="true" data-prefix="fas" data-icon="save" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="pointer fa-lg svg-inline--fa fa-save fa-w-14"><path fill="currentColor" d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z" class=""></path></svg></span> <span><div id="__BVID__25" class="btn-group b-dropdown dropdown"><!----><button id="__BVID__25__BV_toggle_" aria-haspopup="true" aria-expanded="false" type="button" disabled="disabled" class="btn btn-link btn-large disabled"><svg aria-hidden="true" data-prefix="fas" data-icon="ellipsis-v" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" class="svg-inline--fa fa-ellipsis-v fa-w-6 notAllowed"><path fill="currentColor" d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z" class=""></path></svg></button><div role="menu" aria-labelledby="__BVID__25__BV_toggle_" class="dropdown-menu dropdown-menu-right"> <a role="menuitem" href="#" target="_self" class="dropdown-item">Move Items</a> <!----> <a role="menuitem" href="#" target="_self" class="dropdown-item">Clear Current Checklist</a> <a role="menuitem" href="#" target="_self" class="dropdown-item">Add an Attachment</a></div></div></span></div> <!----> <!----> <!----> <ul><div></div></ul></section></div> <div class="panel"><div id="createFolderLine"><input id="__BVID__28" type="text" placeholder="Create New Folder Name" value="" class="form-control"> <span class="self-center notAllowed"><svg aria-hidden="true" data-prefix="fas" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-plus fa-w-14"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" class=""></path></svg></span></div> <div id="folderDisplay"><ul id="folderList"><li class="rootItem folder"><div class="lineItem"><svg aria-hidden="true" data-prefix="fas" data-icon="caret-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fa-lg svg-inline--fa fa-caret-up fa-w-10"><path fill="currentColor" d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z" class=""></path></svg> <!----> <!----> <span>testing</span></div> <!----></li><li class="rootItem folder"><div class="lineItem"><svg aria-hidden="true" data-prefix="fas" data-icon="caret-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fa-lg svg-inline--fa fa-caret-up fa-w-10"><path fill="currentColor" d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z" class=""></path></svg> <!----> <!----> <span>One</span></div> <!----></li><li class="rootItem folder"><div class="lineItem"><svg aria-hidden="true" data-prefix="fas" data-icon="caret-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fa-lg svg-inline--fa fa-caret-up fa-w-10"><path fill="currentColor" d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z" class=""></path></svg> <!----> <!----> <span>two</span></div> <!----></li><li class="rootItem"><div class="lineItem"><!----> <!----> <svg aria-hidden="true" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" class="svg-inline--fa fa-caret-right fa-w-6"><path fill="currentColor" d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z" class=""></path></svg> <span>a</span></div> <!----></li><li class="rootItem"><div class="lineItem"><!----> <!----> <svg aria-hidden="true" data-prefix="fas" data-icon="caret-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" class="svg-inline--fa fa-caret-right fa-w-6"><path fill="currentColor" d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z" class=""></path></svg> <span>c</span></div> <!----></li></ul></div></div></section> <!----></div> */ }
