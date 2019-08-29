import {
  getUser,
  postLogin,
  postSignup,
  postChecklist,
  putChecklist,
  getContacts,
  getContact,
  postContact,
  putContact,
  getItems,
  getLocations,
  postLocation,
  putUser,
  getAppData,
  postSetRelationship
} from '../api/api'

import {
  ADD_CHECKLIST_REQUEST,
  ADD_CHECKLIST_SUCCESS,
  ADD_CONTACT_REQUEST,
  ADD_CONTACT_SUCCESS,
  ADD_LOCATION_REQUEST,
  ADD_LOCATION_SUCCESS,
  APP_DATA_REQUEST,
  APP_DATA_SUCCESS,
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
} from './mutation-types'

// import locations from './mockData/locations'
// import items from './mockData/items'

export default {
  addChecklist: ({ commit }, payload) => {
    commit(ADD_CHECKLIST_REQUEST, payload)
    return new Promise((resolve, reject) => {
      postChecklist(payload).then(function (data) {
        commit(ADD_CHECKLIST_SUCCESS, data.body)
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  addContact: ({ commit }, payload) => {
    commit(ADD_CONTACT_REQUEST, payload)
    return new Promise((resolve, reject) => {
      postContact(payload).then(function (data) {
        commit(ADD_CONTACT_SUCCESS, data.body)
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  addLocation: ({ commit }, payload) => {
    commit(ADD_LOCATION_REQUEST, payload)
    return new Promise((resolve, reject) => {
      postLocation(payload).then(function (data) {
        commit(ADD_LOCATION_SUCCESS, data.body)
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  fetchAppData: ({ commit }, payload) => {
    commit(APP_DATA_REQUEST, payload)
    return new Promise((resolve, reject) => {
      getAppData(payload).then(data => {
        commit(APP_DATA_SUCCESS, data.body)
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  fetchContacts: ({ commit }, payload) => {
    commit(CONTACTS_REQUEST, payload)
    return new Promise((resolve, reject) => {
      getContacts(payload).then(function (data) {
        commit(CONTACTS_SUCCESS, data.body)
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  fetchItems: ({ commit }, payload) => {
    commit(ITEMS_REQUEST, payload)
    return new Promise((resolve, reject) => {
      getItems(payload).then(function (data) {
        commit(ITEMS_SUCCESS, data.body)
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  fetchLocations: ({ commit }, payload) => {
    commit(LOCATIONS_REQUEST, payload)
    return new Promise((resolve, reject) => {
      getLocations(payload).then(function (data) {
        commit(LOCATIONS_SUCCESS, data.body)
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  fetchMe: ({ commit }, payload) => { // payload = Contact._id to get = currentUser.meContactId
    commit(CONTACT_REQUEST, payload)
    return new Promise((resolve, reject) => {
      getContact(payload).then(function (data) {
        commit(CONTACT_SUCCESS, data.body)
        commit(SET_ME, data.body)
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  fetchUser: ({ commit, dispatch }, payload) => {
    commit(USER_REQUEST)
    return new Promise((resolve, reject) => {
      getUser(payload).then(user => {
        commit(USER_SUCCESS, user.body)
        // if (user.body.meContactId) {
        //   dispatch('fetchMe', user.body.meContactId)
        // }
        // dispatch('fetchContacts', user.body._id)
        // dispatch('fetchLocations', user.body._id)
        // dispatch('fetchItems', user.body._id)
        // dispatch('fetchAppData', 'relationshipData')
      }).catch(err => {
        reject(err)
      })
    })
  },

  login: ({ commit, dispatch }, payload) => {
    commit(LOGIN_REQUEST)
    return new Promise((resolve, reject) => {
      postLogin(payload).then(function (authData) {
        commit(LOGIN_SUCCESS, authData.body)
        dispatch('fetchUser', payload.email)
        resolve(authData)
      }).catch(err => {
        reject(err)
      })
    })
  },
  signup: ({ commit, dispatch }, payload) => {
    commit(SIGNUP_REQUEST)
    return new Promise((resolve, reject) => {
      const user = {
        username: payload.username,
        email: payload.email,
        password: payload.password
      }
      postSignup(user).then(function (data) {
        commit(SIGNUP_SUCCESS, data.body)
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  updateChecklist: ({ commit }, payload) => {
    commit(UPDATE_CHECKLIST_REQUEST, payload)
    return new Promise((resolve, reject) => {
      putChecklist(payload).then(function (data) {
        commit(UPDATE_CHECKLIST_SUCCESS, data.body)
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  updateContact: ({ commit, state }, payload) => {
    commit(UPDATE_CONTACT_REQUEST, payload)
    return new Promise((resolve, reject) => {
      getContact(payload._id).then(data => {
        const origContact = data.body
        putContact(payload).then(data => {
          const updatedContact = data.body
          commit(UPDATE_CONTACT_SUCCESS, updatedContact)
          const relationshipData = state.appData.relationshipData
          updatedContact.relationships.forEach(relationship => {
            if (origContact.relationships.findIndex(origRel => origRel.targetContactId === relationship.targetContactId) === -1) {
              const nodeInfo = getNodeInfo(relationshipData, relationship.hostLabel)
              const payload = {
                hostId: updatedContact._id,
                hostLabel: relationship.hostLabel,
                hostType: nodeInfo.hostType,
                targetId: relationship.targetContactId,
                targetLabel: relationship.targetLabel,
                targetType: nodeInfo.targetType
              }
              postSetRelationship(payload).then(result => {
                console.log(result.body.message)
                commit(UPDATE_CONTACT_SUCCESS, result.body.updatedHost)
                commit(UPDATE_CONTACT_SUCCESS, result.body.updatedTarget)
              })
            }
          })
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    })
  },
  updateUser: ({ commit }, payload) => {
    commit(UPDATE_USER_REQUEST, payload)
    return new Promise((resolve, reject) => {
      putUser(payload).then(function (data) {
        commit(UPDATE_USER_SUCCESS, data.body)
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  viewItem: ({ commit }, payload) => {
    commit(SELECT_ITEM, payload)
  },
  viewContact: ({ commit }, payload) => {
    commit(SELECT_CONTACT, payload)
  }
}

function getNodeInfo (relationshipData, label) {
  return relationshipData[relationshipData.findIndex(rec => rec.hostLabels.indexOf(label) !== -1)]
}
