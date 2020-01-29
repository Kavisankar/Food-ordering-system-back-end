const Dish = require('../../models/dish');
const utils = require('./utils');

module.exports = {
  getMenu: async () => {
    try {
      const dishes = await Dish.find()
      return utils.parseDishes(dishes);
    }
    catch(err) {
      console.log(err);
      throw err;
    };
  },
  viewDish: async args => {
    return utils.viewDish(args.id);
  },
  addDish: async arg => {
    try {
      let dish = await Dish.findOne({name: arg.dish.name});
      console.log(dish);
      if(dish){
        return Error("This dish is already exist!");
      }
      dish = new Dish({
        name: arg.dish.name,
        cost: +arg.dish.cost,
        isVeg: Boolean(arg.dish.isVeg),
        availability: typeof arg.dish.availability === 'undefined'? true: Boolean(arg.dish.availability)
      });
      const addedDish = await dish.save();
      return { ...addedDish._doc, id: addedDish.id };
    }
    catch(err) {
      console.log(err);
      throw err;
    };
  },
  removeDish: async args => {
    try {
      if (!utils.validateID(args.id)) {
        return Error("Invalid dish id!");
      }
      const dish = await Dish.findByIdAndDelete(args.id);
      if(!dish) {
        return Error("Dish not found!");
      }
      return { ...dish._doc, id: dish.id };
    }
    catch(err) {
      console.log(err);
      throw err;
    };
  },
  updateDish: async args => {
    try {
      if (!utils.validateID(args.dish.id)) {
        return Error("Invalid dish id!");
      }
      const dish = await Dish.findOneAndUpdate(
        {_id: args.dish.id},
        { $set:{
          "cost": +args.dish.cost,
          "isVeg": Boolean(args.dish.isVeg),
          "availability": Boolean(args.dish.availability)
        } 
      });
      if(!dish) {
        return Error("Dish not found!");
      }
      return { ...args.dish }
    }
    catch(err) {
      console.log(err);
      throw err;
    };
  }
}