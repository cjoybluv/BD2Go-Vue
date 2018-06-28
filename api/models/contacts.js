const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name field is required']
  },
  email: {
    type: String
  }
})

const Contact = mongoose.model('user', ContactSchema)

module.exports = Contact
