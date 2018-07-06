const mongoose = require('mongoose')
// const moment = require('moment')

const Schema = mongoose.Schema

const NodeSchema = new Schema({
  itemId: Schema.Types.ObjectId,
  nodeLabel: String
})

const ItemSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    required: [true, 'ownerId required']
  },
  type: {
    type: String,
    required: [true, 'Item.type is required'],
    enum: ['appt', 'task', 'note']
  },
  subject: {
    type: String,
    required: [true, 'subject is required']
  },
  body: String,
  status: String,
  statusHistory: [
    {
      newStatus: String,
      dateSet: {
        type: Date
      }
    }
  ],
  dates: [
    {
      date: {
        type: Date
      },
      dateLabel: String
    }
  ],
  contacts: [
    {
      contactId: Schema.Types.ObjectId,
      contactLabel: String,
      primary: Boolean
    }
  ],
  locations: [
    {
      locationId: Schema.Types.ObjectId,
      locationLabel: String,
      primary: Boolean
    }
  ],
  node: {
    parent: [NodeSchema],
    sibling: [NodeSchema],
    child: [NodeSchema]
  }
})

const Item = mongoose.model('item', ItemSchema)

module.exports = Item
