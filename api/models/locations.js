const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LocationSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    required: [true, 'ownerId required']
  },
  name: {
    type: String,
    required: [true, 'location.name is required']
  },
  street: String,
  city: String,
  st: String,
  zip: String,
  contacts: [
    {
      contactId: Schema.Types.ObjectId,
      contactLabel: String,
      contactStar: Boolean
    }
  ],
  items: [
    {
      itemId: Schema.Types.ObjectId,
      itemLabel: String,
      itemStar: Boolean
    }
  ],
  geoLocation: {
    lng: String,
    lat: String
  }
})

const Location = mongoose.model('location', LocationSchema)

module.exports = Location
