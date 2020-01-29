const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  cost: {
    type: Number,
    required: true
  },
  isVeg: {
    type: Boolean,
    required: true
  },
  availability: {
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model('Dish', dishSchema);
