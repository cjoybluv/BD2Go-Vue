const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'username field is required']
  },
  email: {
    type: String,
    required: [true, 'email field is required']
  },
  password: {
    type: String,
    required: [true, 'password field is required']
  },
  meContactId: {
    type: Schema.Types.ObjectId
  },
  folders: {
    type: Array
  }
})

const User = mongoose.model('user', UserSchema)

module.exports = User
