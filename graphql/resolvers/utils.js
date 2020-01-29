const Dish = require('../../models/dish');

const viewDish = async id => {
  try {
    if (!validateID(id)) {
      return Error("Invalid dish id!");
    }
    const dish = await Dish.findById(id);
    if(!dish) {
      return Error("Dish not found!");
    }
    return { ...dish._doc, id: dish.id }
  }
  catch(err) {
    console.log(err);
    throw err;
  };
};

const parseDishes = dishes => {
  return dishes.map(dish => {
    return { ...dish._doc, id: dish.id };
  })
};

const parseDishesWithQuantity = async dishes => {
  const result = Promise.all(dishes.map( async item => {
    const dish = await viewDish(item.dish.toString());
    return { ...dish, quantity: item.quantity};
  }));
  return result;
};

const validateID = id => id.match(/^[0-9a-fA-F]{24}$/);

module.exports = {
  viewDish,
  parseDishes,
  parseDishesWithQuantity,
  validateID
} 