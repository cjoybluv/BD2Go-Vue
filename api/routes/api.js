const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const findIndex = require('lodash.findindex')

const router = express.Router()

const nodeData = [
  {
    hostLabels: ['grandpa', 'grandfather', 'grandma', 'grandmother'],
    hostType: 'child',
    targetLabels: ['grandchild', 'grandson', 'granddaughter'],
    targetType: 'parent',
    viaLabels: ['child', 'son', 'daughter'],
    viaReciprocalLabels: ['parent', 'father', 'mother', 'dad', 'mom']
  },
  {
    hostLabels: ['child', 'son', 'daughter'],
    hostType: 'parent',
    targetLabels: ['parent', 'father', 'mother', 'dad', 'mom'],
    targetType: 'child',
    viaLabels: [],
    viaReciprocalLabels: []
  },
  {
    hostLabels: ['parent', 'father', 'mother', 'dad', 'mom'],
    hostType: 'child',
    targetLabels: ['child', 'son', 'daughter'],
    targetType: 'parent',
    viaLabels: [],
    viaReciprocalLabels: []
  },
  {
    hostLabels: ['grandchild', 'grandson', 'granddaughter'],
    hostType: 'parent',
    targetLabels: ['grandpa', 'grandfather', 'grandma', 'grandmother'],
    targetType: 'child',
    viaLabels: ['parent', 'father', 'mother', 'dad', 'mom'],
    viaReciprocalLabels: ['child', 'son', 'daughter']
  }
]

const User = require('../models/users')
const Contact = require('../models/contacts')

const JWT_SECRET_KEY = 'getConnected'

const saltRounds = 10

router.post('/auth/signup', function (req, res, next) {
  const password = req.body.password
  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) res.status(500).send({error: err})
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: hash
    }
    User.findOne({email: newUser.email}).then(function (user) {
      if (!user) {
        User.create(newUser).then(function (user) {
          res.send(user)
        }).catch(next)
      } else {
        res.status(401).send({error: 'email exists'})
      }
    }).catch(next)
  })
})

router.post('/auth/login', function (req, res, next) {
  User.findOne({email: req.body.email}).then(function (user) {
    if (!user) res.status(401).send({error: 'Not authorized'})
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (err) res.status(401).send({error: err})
      if (!result) res.status(401).send({error: 'Not Authorized'})
      jwt.sign({user}, JWT_SECRET_KEY, {expiresIn: '1h'}, (err, token) => {
        if (err) {
          res.sendStatus(424)
        } else {
          res.json({user, token})
        }
      })
    })
  }).catch(next)
})

router.get('/contacts', verifyToken, (req, res, next) => {
  jwt.verify(req.token, JWT_SECRET_KEY, (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Contact.find({ownerId: req.query.ownerId}).then(contacts => {
        res.json(contacts)
      }).catch(error => {
        res.json({error})
      })
    }
  })
})

router.get('/contacts/:id', verifyToken, (req, res, next) => {
  Contact.findById(req.params.id).then(function (contact) {
    res.json(contact)
  }).catch(error => {
    res.json({error})
  })
})

router.post('/contacts', verifyToken, (req, res, next) => {
  Contact.create(req.body).then(contact => {
    res.json(contact)
  }).catch(error => {
    res.json({error})
  })
})

router.put('/contacts/:id', verifyToken, (req, res, next) => {
  Contact.findByIdAndUpdate({_id: req.params.id}, req.body).then(function () {
    Contact.findOne({_id: req.params.id}).then(function (contact) {
      res.json(contact)
    })
  })
})

router.get('/users', verifyToken, (req, res, next) => {
  jwt.verify(req.token, JWT_SECRET_KEY, (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      User.findOne({email: req.query.email}).then(user => {
        res.json(user)
      }).catch(error => {
        res.json({error})
      })
    }
  })
})

router.put('/users/:id', verifyToken, (req, res, next) => {
  User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function () {
    User.findById(req.params.id).then(function (user) {
      res.json(user)
    }).catch(error => {
      res.json({error})
    })
  }).catch(error => {
    res.json({error})
  })
})

router.post('/setRelationship', verifyToken, (req, res, next) => {
  const { hostId, label, targetId } = req.body
  const nodeInfo = getNodeInfo(label)

  Contact.findById(hostId).then(host => {
    const updatedHost = {
      node: {
        parent: [],
        sibling: [],
        child: []
      },
      ...host.body
    }
    updatedHost.node[nodeInfo.hostType].push({
      label: nodeInfo.targetLabels[0],
      contactId: targetId
    })
    Contact.findByIdAndUpdate({_id: hostId}, updatedHost).then(() => {
      Contact.findById(targetId).then(target => {
        const updatedTarget = {
          node: {
            parent: [],
            sibling: [],
            child: []
          },
          ...target.body
        }
        updatedTarget.node[nodeInfo.targetType].push({
          label,
          contactId: hostId
        })
        Contact.findByIdAndUpdate({_id: targetId}, updatedTarget).then(() => {
          res.json({ message: 'all set' })
        }).catch(error => {
          res.status(422).json({error})
        })
      }).catch(error => {
        res.status(422).json({error})
      })
    }).catch(error => {
      res.status(422).json({error})
    })
  }).catch(error => {
    res.sStatus(422).json({error})
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

function getNodeInfo (label) {
  return nodeData[nodeData.findIndex(rec => rec.hostLabels.indexOf(label) !== -1)]
}

module.exports = router
