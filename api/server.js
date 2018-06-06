const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// const request = require('request');
// const async = require('async');
// const geocoder = require('geocoder');
// const bcrypt = require('bcrypt');

const app = express()

mongoose.connect('mongodb://127.0.0.1/bd2go')

app.use(bodyParser.json())

app.use('/api', require('./routes/api'))

app.use(function (err, req, res, next) {
  // 422 = unprocessable entity
  res.status(422).send({error: err.message})
})

app.listen(process.env.port || 8881, function () {
  console.log('now listening on port 8881')
})
