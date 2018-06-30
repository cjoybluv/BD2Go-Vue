const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PhoneSchema = new Schema({
  phoneLabel: String,
  phoneNumber: String
})

const ContactSchema = new Schema({
  ownerId: String,
  name: {
    type: String,
    required: [true, 'name field is required']
  },
  email: {
    type: String
  },
  phones: [PhoneSchema],
  locations: [
    {
      street: String,
      city: String,
      st: String,
      zip: String
    }
  ],
  relationships: [
    {
      relatedContactId: Schema.Types.ObjectId,
      relationshipTag: String
    }
  ],
  social: [
    {
      site: String,
      username: String
    }
  ]
})

const Contact = mongoose.model('contact', ContactSchema)

module.exports = Contact
