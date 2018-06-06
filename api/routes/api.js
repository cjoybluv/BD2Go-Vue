const express = require('express')
const router = express.Router()

const User = require('../models/users')

router.post('/signup', function (req, res, next) {
  User.findOne({email: req.body.email}).then(function (user) {
    if (!user) {
      User.create(req.body).then(function (user) {
        res.send(user)
      }).catch(next)
    } else {
      res.status(401).send({error: 'email exists'})
    }
  })
})

router.post('/login', function (req, res, next) {
  User.findOne({email: req.body.email}).then(function (user) {
    if (user.password === req.body.password) {
      res.send(user)
    } else {
      res.status(401).send({error: 'Not Authorized'})
    }
  }).catch(next)
})

module.exports = router
