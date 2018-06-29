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

export function postContact (payload) {
  let contact = {
    ownerId: payload.ownerId,
    name: payload.name,
    email: payload.email,
    phones: []
  }

  contact.phones.push({phoneNumber: payload.phoneNumber, phoneTag: payload.phoneTag})
  console.log('postContact', contact)
  // console.log('postContact-pre', payload.phones[0].phoneNumber)
  // payload.phones.forEach((phone, i) => {
  //   console.log('phone', JSON.stringify(payload))
  //   contact.phones.push({phoneNumber: payload.phones[i].phoneNumber, phoneTag: payload.phones[i].phoneTag})
  // })
  // console.log('postContact', contact)
  return new Promise((resolve, reject) => {
    Vue.http.post(PATHNAME + '/contacts', contact).then(function (data) {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}
