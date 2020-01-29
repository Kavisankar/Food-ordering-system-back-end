const Dish = require('../../models/dish');

const viewDish = async id => {
  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return Error("Invalid dish id");
    }
    const dish = await Dish.findById(id);
    if(!dish) {
      return Error("Dish not found");
    }
    return { ...dish._doc, id: dish.id };
  }
  catch(err) {
    console.log(err);
    throw err;
  };
};

module.exports = {
  viewDish,
}
