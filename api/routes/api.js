const express = require('express')
const jwt = require('jsonwebtoken')

const router = express.Router()

const User = require('../models/users')

const JWT_SECRET_KEY = 'getConnected'

router.post('/signup', function (req, res, next) {
  User.findOne({email: req.body.email}).then(function (user) {
    if (!user) {
      User.create(req.body).then(function (user) {
        res.send(user)
      }).catch(next)
    } else {
      res.status(401).send({error: 'email exists'})
    }
  }).catch(next)
})

router.post('/auth/login', function (req, res, next) {
  User.findOne({email: req.body.email}).then(function (user) {
    if (user.password === req.body.password) {
      // const now = new Date
      jwt.sign({user}, JWT_SECRET_KEY, {expiresIn: '1h'}, (err, token) => {
        if (err) {
          res.sendStatus(424)
        } else {
          res.json({
            token
          })
        }
      })
    } else {
      res.status(401).send({error: 'Not Authorized'})
    }
  }).catch(next)
})

router.get('/contacts', verifyToken, (req, res, next) => {
  jwt.verify(req.token, JWT_SECRET_KEY, (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      res.json({
        message: 'GET contacts',
        authData
      })
    }
  })
})

router.get('/users', verifyToken, (req, res, next) => {
  jwt.verify(req.token, JWT_SECRET_KEY, (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      User.findOne({email: req.query.email}).then(user => {
        res.json(user)
      }).catch(err => {
        console.log(err)
      })
    }
  })
})

function verifyToken (req, res, next) {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1]
    req.token = bearerToken
    next()
  } else {
    res.sendStatus('403')
  }
}

module.exports = router
