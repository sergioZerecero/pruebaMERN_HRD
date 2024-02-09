const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const entrieSchema = new Schema({
  type: {
    type: String,
    enum: ['video', 'image', 'text'],
    required: true
  },
  description: {
    type: String,
    minLength: 20,
    maxLength: 100
  },
  value: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true
  }
})