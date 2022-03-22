const { KitchenRepository } = require("../database");
const { formatData } = require("../utils");

class KitchenService {
  constructor() {
    this.repository = new KitchenRepository();
  }

  async AddRecipe(userInputs) {
    const { name, image } = userInputs;
    try {
      const recipeResult = await this.repository.createRecipe({ name, image });
      return formatData(recipeResult);
    } catch (error) {
      console.log(error);
    }
  }

  async addIngredient(recipeId, required_qt, ingredient) {
    try {
      const ingredientsResult = await this.repository.insertIngredient(
        recipeId,
        required_qt,
        ingredient
      );
      console.log(formatData(ingredientsResult));
      return formatData(ingredientsResult);
    } catch (error) {
      console.log("Service Error");
    }
  }

  async getRecipes() {
    try {
      const recipes = await this.repository.recipes();
      return formatData(recipes);
    } catch (error) {
      console.error(error);
    }
  }

  async getRandomRecipes(serves_number) {
    const recipes = await this.getRecipes();
    const orderContent = [];
    for (let i = 0; i < serves_number; i++) {
      orderContent.push(
        recipes.data[Math.floor(Math.random() * recipes.data.length)]
      );
    }
    return orderContent;
  }

  async addOrder(serves_number) {
    try {
      const recipes = await this.getRandomRecipes(serves_number);
      const orderResult = await this.repository.createOrder({
        serves_number,
        recipes,
      });
      return formatData(orderResult);
    } catch (error) {
      console.log(error);
    }
  }

  async getOrders() {
    try {
      const orders = await this.repository.getOrders();
      return formatData(orders);
    } catch (error) {
      console.log(error);
    }
  }

  async dispatchOrder(orderId) {
    try {
      const order = await this.repository.dispatchOrder(orderId);
      return formatData(order);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = KitchenService;
