const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LocationSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    required: [true, 'ownerId required']
  },
  name: String,
  street: String,
  city: String,
  st: String,
  zip: String,
  geoLocation: {
    lng: String,
    lat: String
  }
})

const Location = mongoose.model('location', LocationSchema)

module.exports = Location
