const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const router = express.Router()

const User = require('../models/users')
const Contact = require('../models/contacts')
const Item = require('../models/items')
const Location = require('../models/locations')
const AppData = require('../models/appData')

const JWT_SECRET_KEY = 'getConnected'

const saltRounds = 10

router.post('/auth/signup', (req, res, next) => {
  const password = req.body.password
  bcrypt.hash(password, saltRounds, function (error, hash) {
    if (error) res.status(500).json({error})
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: hash
    }
    User.findOne({email: newUser.email}).then(user => {
      if (!user) {
        User.create(newUser).then(user => {
          res.json(user)
        }).catch(error => {
          res.json({error})
        })
      } else {
        res.status(401).send({error: 'email exists'})
      }
    }).catch(error => {
      res.json({error})
    })
  })
})

router.post('/auth/login', (req, res, next) => {
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
  }).catch(error => {
    res.json({error})
  })
})

router.get('/contacts', verifyToken, (req, res, next) => {
  jwt.verify(req.token, JWT_SECRET_KEY, (err, _authData) => {
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
  jwt.verify(req.token, JWT_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Contact.findById(req.params.id).then(contact => {
        res.json(contact)
      }).catch(error => {
        res.json({error})
      })
    }
  })
})

router.post('/contacts', verifyToken, (req, res, next) => {
  jwt.verify(req.token, JWT_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Contact.create(req.body).then(contact => {
        res.json(contact)
      }).catch(error => {
        res.json({error})
      })
    }
  })
})

router.put('/contacts/:id', verifyToken, (req, res, next) => {
  jwt.verify(req.token, JWT_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Contact.findByIdAndUpdate({_id: req.params.id}, req.body).then(() => {
        Contact.findById(req.params.id).then(contact => {
          res.json(contact)
        }).catch(error => {
          res.json({error})
        })
      }).catch(error => {
        res.json({error})
      })
    }
  })
})

router.delete('/contacts/:id', verifyToken, (req, res, next) => {
  jwt.verify(req.token, JWT_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Contact.findByIdAndDelete(req.params.id).then(contact => {
        res.json(contact)
      }).catch(error => {
        res.json({error})
      })
    }
  })
})

router.get('/items', verifyToken, (req, res, next) => {
  jwt.verify(req.token, JWT_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Item.find({ownerId: req.query.ownerId}).then(items => {
        res.json(items)
      }).catch(error => {
        res.json({error})
      })
    }
  })
})

router.get('/items/:id', verifyToken, (req, res, next) => {
  jwt.verify(req.token, JWT_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Item.findById(req.params.id).then(item => {
        res.json(item)
      }).catch(error => {
        res.json({error})
      })
    }
  })
})

router.post('/items', verifyToken, (req, res, next) => {
  jwt.verify(req.token, JWT_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Item.create(req.body).then(item => {
        res.json(item)
      }).catch(error => {
        res.json({error})
      })
    }
  })
})

router.put('/items/:id', verifyToken, (req, res, next) => {
  jwt.verify(req.token, JWT_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Item.findByIdAndUpdate({_id: req.params.id}, req.body).then(() => {
        Item.findById(req.params.id).then(item => {
          res.json(item)
        }).catch(error => {
          res.json({error})
        })
      }).catch(error => {
        res.json({error})
      })
    }
  })
})

router.delete('/items/:id', verifyToken, (req, res, next) => {
  jwt.verify(req.token, JWT_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Item.findByIdAndDelete(req.params.id).then(item => {
        res.json(item)
      }).catch(error => {
        res.json({error})
      })
    }
  })
})

router.get('/locations', verifyToken, (req, res, next) => {
  jwt.verify(req.token, JWT_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Location.find({ownerId: req.query.ownerId}).then(locations => {
        res.json(locations)
      }).catch(error => {
        res.json({error})
      })
    }
  })
})

router.get('/locations/:id', verifyToken, (req, res, next) => {
  jwt.verify(req.token, JWT_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Location.findById(req.params.id).then(location => {
        res.json(location)
      }).catch(error => {
        res.json({error})
      })
    }
  })
})

router.post('/locations', verifyToken, (req, res, next) => {
  jwt.verify(req.token, JWT_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Location.create(req.body).then(location => {
        res.json(location)
      }).catch(error => {
        res.json({error})
      })
    }
  })
})

router.put('/locations/:id', verifyToken, (req, res, next) => {
  jwt.verify(req.token, JWT_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Location.findByIdAndUpdate({_id: req.params.id}, req.body).then(() => {
        Location.findById(req.params.id).then(location => {
          res.json(location)
        }).catch(error => {
          res.json({error})
        })
      }).catch(error => {
        res.json({error})
      })
    }
  })
})

router.delete('/locations/:id', verifyToken, (req, res, next) => {
  jwt.verify(req.token, JWT_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      Location.findByIdAndDelete(req.params.id).then(location => {
        res.json(location)
      }).catch(error => {
        res.json({error})
      })
    }
  })
})

router.get('/users', verifyToken, (req, res, next) => {
  jwt.verify(req.token, JWT_SECRET_KEY, (err, _authData) => {
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
  jwt.verify(req.token, JWT_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function () {
        User.findById(req.params.id).then(function (user) {
          res.json(user)
        }).catch(error => {
          res.json({error})
        })
      }).catch(error => {
        res.json({error})
      })
    }
  })
})

router.post('/setRelationship', verifyToken, (req, res, next) => {
  jwt.verify(req.token, JWT_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      const { hostId, hostLabel, hostType, targetId, targetLabel, targetType } = req.body

      Contact.findById(hostId).then(host => {
        const updatedHost = {
          node: {
            parent: [],
            sibling: [],
            child: []
          },
          ...host._doc
        }
        updatedHost.node[targetType].push({
          contactId: targetId,
          nodeLabel: targetLabel
        })
        Contact.findByIdAndUpdate({_id: hostId}, updatedHost).then(() => {
          Contact.findById(targetId).then(target => {
            const updatedTarget = {
              node: {
                parent: [],
                sibling: [],
                child: []
              },
              ...target._doc
            }
            updatedTarget.node[hostType].push({
              contactId: hostId,
              nodeLabel: hostLabel
            })
            updatedTarget.relationships.push({
              hostLabel: targetLabel,
              targetContactId: hostId,
              targetLabel: hostLabel
            })
            Contact.findByIdAndUpdate({_id: targetId}, updatedTarget).then(() => {
              res.json({
                message: 'RELATIONSHIP SET: ' + updatedHost.name + ' is ' + hostLabel + ' of ' + updatedTarget.name + ', is ' + targetLabel + ' of ' + updatedHost.name,
                updatedHost,
                updatedTarget
              })
            }).catch(error => {
              res.status(422).json({error: 'target not updated: ' + error})
            })
          }).catch(error => {
            res.status(422).json({error: 'targetId not found: ' + error})
          })
        }).catch(error => {
          res.status(422).json({error: 'hostId not updated: ' + error})
        })
      }).catch(error => {
        res.status(422).json({error: 'hostId not found: ' + error})
      })
    }
  })
})

router.get('/appData/:key', verifyToken, (req, res, next) => {
  jwt.verify(req.token, JWT_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      AppData.findOne({key: req.params.key}).then(appRec => {
        res.json(appRec)
      }).catch(error => {
        console.log('ERROR: UNABLE TO GET AppData.' + req.params.key + ': ' + error)
      })
    }
  })
})

router.post('/appData', verifyToken, (req, res, next) => {
  jwt.verify(req.token, JWT_SECRET_KEY, (err, _authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      AppData.findOneAndUpdate({key: req.body.key}, req.body).then(appRec => {
        res.json(appRec)
      }).catch(error => {
        res.json({error})
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
