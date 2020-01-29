const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  customerName: {
    type: String,
    require: true
  },
  customerPhoneNo: {
    type: String,
    require: true
  },
  customerAddress: {
    type: String,
    require: true
  },
  placedOn: {
    type: Date,
    require: true
  },
  dishes: [
    {
      dish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish',
        require: true
      },
      quantity: {
        type: Number,
        require: true
      }
    }
  ]
})

module.exports = mongoose.model('Order',orderSchema);
