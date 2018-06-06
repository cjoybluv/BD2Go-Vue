const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagsSchema = new Schema({
  contactTags: [String],
  locationTags: [String],
  dateTags: [String]
})

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'email field is required']
  },
  password: {
    type: String,
    required: [true, 'password field is required']
  },
  tags: TagsSchema
})

const User = mongoose.model('user', UserSchema)

module.exports = User
