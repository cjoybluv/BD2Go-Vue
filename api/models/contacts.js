const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PhoneSchema = new Schema({
  phoneLabel: String,
  phoneNumber: String
})

const NodeSchema = new Schema({
  contactId: Schema.Types.ObjectId,
  nodeLabel: String
})

const ContactSchema = new Schema({
  ownerId: Schema.Types.ObjectId,
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
      hostLabel: String,
      targetContactId: Schema.Types.ObjectId,
      targetLabel: String
    }
  ],
  social: [
    {
      site: String,
      username: String
    }
  ],
  node: {
    parent: [NodeSchema],
    sibling: [NodeSchema],
    child: [NodeSchema]
  }
})

const Contact = mongoose.model('contact', ContactSchema)

module.exports = Contact
