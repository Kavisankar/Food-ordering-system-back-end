const Order = require('../../models/order');
const utils = require('./utils');

module.exports = {
  getAllOrderList: async (args, req) => {
    if (!req.isAuth) {
      return Error('Unauthenticated!');
    }
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
  getOrderList: async (args, req) => {
    if (!req.isAuth) {
      return Error('Unauthenticated!');
    }
    try {
      const orders = await Order.find({
        isDelivered: {
          $eq: false
        }
      }).sort('placedOn');
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
  viewOrder: async (args, req) => {
    if (!req.isAuth) {
      return Error('Unauthenticated!');
    }
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
  removeOrder: async (args, req) => {
    if (!req.isAuth) {
      return Error('Unauthenticated!');
    }
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
  updateOrderDelivery: async (args, req) => {
    if (!req.isAuth) {
      return Error('Unauthenticated!');
    }
    try {
      if (!utils.validateID(args.id)) {
        return Error("Invalid dish id");
      }
      const order = await Order.findOneAndUpdate(
        { _id: args.id },
        { $set: {
          "isDelivered" : true,
        }}
      );
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