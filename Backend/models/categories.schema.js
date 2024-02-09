const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  description: {
    type: String,
    maxLength: 80
  },
  acceptVideos: {
    type: Boolean,
    default: false
  },
  acceptImage: {
    type: Boolean,
    default: false
  },
  acceptText: {
    type: Boolean,
    default: false
  },

  createdDate: {
    type: Date,
    default: new Date()
  }
})

module.exports = mongoose.model('category', categorySchema)