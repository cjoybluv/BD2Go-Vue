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
