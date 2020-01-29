const Order = require('../../models/order');
const utils = require('./utils');

module.exports = {
  getOrderList: async () => {
    try {
      const orders = await Order.find();
      return orders.map( order => {
        return { ...order._doc,
          id: order.id,
          placedOn: order.placedOn.toISOString(),
          dishes: utils.parseDishesWithQuantity.bind(this,order.dishes)
        };
      });
    }
    catch(err) {
      throw err;
    };
  },
  viewOrder: async args => {
    try {
      if (!utils.validateID(args.id)) {
        return Error("Invalid dish id");
      }
      const order = await Order.findById(args.id);
      if(!order) {
        return Error("Order not found!");
      }
      return { ...order._doc,
        id: order.id,
        placedOn: order.placedOn.toISOString(),
        dishes: utils.parseDishesWithQuantity.bind(this,order.dishes) };
    }
    catch(err) {
      throw err;
    };
  },
  removeOrder: async args => {
    try {
      if (!utils.validateID(args.id)) {
        return Error("Invalid dish id");
      }
      const order = await Order.findByIdAndDelete(args.id);
      if(!order) {
        return Error("Order not found!");
      }
      return { ...order._doc,
        id: order.id,
        placedOn: order.placedOn.toISOString(),
        dishes: utils.parseDishesWithQuantity.bind(this,order.dishes) };
    }
    catch(err) {
      throw err;
    };
  },
  placeOrder: async args => {
    try {
      const order = new Order({
        customerName: args.order.customerName,
        customerPhoneNo: args.order.customerPhoneNo,
        customerAddress: args.order.customerAddress,
        placedOn: new Date(),
        dishes: args.order.dishes
      });
      var placedOrder = await order.save();
      return { 
        ...placedOrder._doc, 
        id: placedOrder.id,
        placedOn: placedOrder.placedOn.toISOString(),
        dishes: utils.parseDishesWithQuantity.bind(this,placedOrder.dishes) };
  }
  catch(err) {
    throw err;
  };
  }
}