const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ChecklistSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    required: [true, 'ownerId required']
  },
  title: {
    type: String,
    required: [true, 'Checklist.title is required']
  },
  items: [
    {
      key: {
        type: Number,
        required: [true, 'item.key is required']
      },
      subject: {
        type: String,
        required: [true, 'item.subject is required']
      }
    }
  ]
})

const Checklist = mongoose.model('Checklist', ChecklistSchema)

module.exports = Checklist