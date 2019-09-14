import Vue from 'vue'

const PATHNAME = 'http://127.0.0.1:8881/api/v1'

export function postLogin (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.post(PATHNAME + '/auth/login', payload).then(authData => {
      resolve(authData)
    }).catch(err => {
      reject(err)
    })
  })
}

export function postSignup (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.post(PATHNAME + '/auth/signup', payload).then(function (data) {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getChecklists (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.get(PATHNAME + '/checklists?ownerId=' + payload).then(function (data) {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getChecklist (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.get(PATHNAME + '/checklists/' + payload).then(function (data) {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function postChecklist (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.post(PATHNAME + '/checklists', payload).then(function (data) {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function putChecklist (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.put(PATHNAME + '/checklists/' + payload._id, payload).then(function (data) {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function deleteChecklist (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.delete(PATHNAME + '/checklists/' + payload._id).then(function (data) {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getContacts (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.get(PATHNAME + '/contacts?ownerId=' + payload).then(function (data) {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getContact (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.get(PATHNAME + '/contacts/' + payload).then(function (data) {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function postContact (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.post(PATHNAME + '/contacts', payload).then(function (data) {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function putContact (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.put(PATHNAME + '/contacts/' + payload._id, payload).then(function (data) {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function deleteContact (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.delete(PATHNAME + '/contacts/' + payload._id).then(function (data) {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getItems (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.get(PATHNAME + '/items?ownerId=' + payload).then(function (data) {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getItem (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.get(PATHNAME + '/items/' + payload).then(function (data) {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function postItem (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.post(PATHNAME + '/items', payload).then(function (data) {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function putItem (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.put(PATHNAME + '/items/' + payload._id, payload).then(function (data) {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function deleteItem (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.delete(PATHNAME + '/items/' + payload._id).then(function (data) {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getLocations (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.get(PATHNAME + '/locations?ownerId=' + payload).then(function (data) {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getLocation (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.get(PATHNAME + '/locations/' + payload).then(function (data) {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function postLocation (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.post(PATHNAME + '/locations', payload).then(function (data) {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function putLocation (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.put(PATHNAME + '/locations/' + payload._id, payload).then(function (data) {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function deleteLocation (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.delete(PATHNAME + '/locations/' + payload._id).then(function (data) {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getUser (payload) { // payload = email
  return new Promise((resolve, reject) => {
    Vue.http.get(PATHNAME + '/users?email=' + payload).then(user => {
      resolve(user)
    }).catch(err => {
      reject(err)
    })
  })
}

export function putUser (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.put(PATHNAME + '/users/' + payload._id, payload).then(function (data) {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function postSetRelationship (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.post(PATHNAME + '/setRelationship', payload).then(data => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getAppData (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.get(PATHNAME + '/appData/' + payload).then(data => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function postAppData (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.post(PATHNAME + '/appData', payload).then(function (data) {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function putAppData (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.put(PATHNAME + '/appData/' + payload._id, payload).then(function (data) {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}
