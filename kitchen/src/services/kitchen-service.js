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

  async addIngredient(recipeName, required_qt, ingredient) {
    try {
      const ingredientsResult = await this.repository.insertIngredient(
        recipeName,
        required_qt,
        ingredient
      );
      return formatData(ingredientsResult);
    } catch (error) {
      console.log(error);
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

  async getOrders(received, dispatched) {
    try {
      const orders = await this.repository.getOrders(received, dispatched);
      return formatData(orders);
    } catch (error) {
      console.log(error);
    }
  }

  async dispatchOrder(orderId) {
    try {
      await this.repository.dispatchOrder(orderId);
      return formatData({ message: `Order ${orderId} dispatched` });
    } catch (error) {
      console.log(error);
    }
  }

  async getOrderPayload(order, event) {
    if (order) {
      const payload = {
        event,
        data: { order },
      };
      return payload;
    } else {
      return formatData({ error: "No Order Data" });
    }
  }

  async subscribeEvents(payload) {
    payload = JSON.parse(payload);
    const { event, data } = payload;
    const { recipeName, required_qt, product, orderId } = data;

    switch (event) {
      case "ADD_INGREDIENT_TO_RECIPE":
        this.addIngredient(recipeName, required_qt, product);
        break;
      case "DISPATCH_ORDER":
        this.dispatchOrder(orderId);
        break;
      default:
        break;
    }
  }
}

module.exports = KitchenService;
