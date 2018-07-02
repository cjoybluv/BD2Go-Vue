const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const PATHNAME = '/api/v1'
// const request = require('request');
// const async = require('async');
// const geocoder = require('geocoder');
// const bcrypt = require('bcrypt');

const app = express()

mongoose.connect('mongodb://127.0.0.1/bd2go')

app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, HEAD')
  next()
})

app.use(PATHNAME, require('./routes/api'))

app.use(function (err, req, res, next) {
  // 422 = unprocessable entity
  res.status(422).send({error: err.message})
})

app.listen(process.env.port || 8881, function () {
  console.log('now listening on port 8881')
})
