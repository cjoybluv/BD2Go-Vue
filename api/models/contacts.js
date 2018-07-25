const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PhoneSchema = new Schema({
  phoneLabel: String,
  phoneNumber: String
})

const NodeSchema = new Schema({
  contactId: {
    type: Schema.Types.ObjectId,
    required: [true, 'contact.node.*.contactId required']
  },
  nodeLabel: {
    type: String,
    lowercase: true
  }
})

const ContactSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    required: [true, 'contact.ownerId required']
  },
  name: {
    type: String,
    required: [true, 'name field is required']
  },
  pronoun: {
    type: String
  },
  email: {
    type: String
  },
  phones: [PhoneSchema],
  locations: [
    {
      locationId: Schema.Types.ObjectId,
      locationLabel: String
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
