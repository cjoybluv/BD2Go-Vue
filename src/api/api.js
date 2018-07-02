import Vue from 'vue'

const PATHNAME = 'http://127.0.0.1:8881/api/v1'

export function getUser (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.get(PATHNAME + '/users?email=' + payload).then(user => {
      resolve(user)
    }).catch(err => {
      reject(err)
    })
  })
}

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

export function getContacts (payload) {
  return new Promise((resolve, reject) => {
    Vue.http.get(PATHNAME + '/contacts?ownerId=' + payload).then(function (data) {
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
    console.log('putContact', payload)
    Vue.http.put(PATHNAME + '/contacts/' + payload._id, payload).then(function (data) {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}
