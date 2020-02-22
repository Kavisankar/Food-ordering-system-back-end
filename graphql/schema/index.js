const graphql = require('graphql');

module.exports = graphql.buildSchema(`
  type Dish {
    id: String!
    name: String!
    cost: Float!
    isVeg: Boolean!
    availability: Boolean!
  }

  input DishInput {
    name: String!
    cost: Float!
    isVeg: Boolean
    availability: Boolean
  }

  input DishUpdateInput {
    id: String!
    name: String!
    cost: Float!
    isVeg: Boolean!
    availability: Boolean!
  }

  input DishIDWithQuantity {
    dish: String!
    quantity: Int!
  }

  type DishWithQuantity {
    id: String!
    name: String!
    cost: Float!
    isVeg: Boolean!
    availability: Boolean!
    quantity: Int!
  }

  type Order {
    id: String!
    customerName: String!
    customerPhoneNo: String!
    customerAddress: String!
    placedOn: String!
    dishes: [DishWithQuantity!]!
  }

  input OrderInput {
    customerName: String!
    customerPhoneNo: String!
    customerAddress: String!
    dishes: [DishIDWithQuantity!]!
  }

  type Token {
    token: String!,
    tokenExpiration: Int!
  }

  type RootQuery {
    getMenu: [Dish!]!
    getDishes: [Dish!]!
    getOrderList: [Order!]!
    viewDish(id: String!): Dish!
    viewOrder(id: String!): Order!
  }

  type RootMutation {
    login(name: String!, pswd: String!): Token!
    addDish(dish: DishInput!): Dish!
    removeDish(id: String!): Dish!
    updateDish(dish: DishUpdateInput!): Dish!
    placeOrder(order: OrderInput): Order!
    removeOrder(id: String!): Order!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);