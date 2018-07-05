const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AppDataSchema = new Schema({
  key: {
    type: String,
    required: [true, 'key is required']
  },
  data: Schema.Types.Mixed
})

const AppData = mongoose.model('appData', AppDataSchema, 'appData')

module.exports = AppData
