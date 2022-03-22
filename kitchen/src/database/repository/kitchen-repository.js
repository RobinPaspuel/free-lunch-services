const { RecipeModel, OrderModel } = require("../models");

class KitchenRepository {
  async recipes() {
    try {
      return await RecipeModel.find();
    } catch (error) {
      console.log(error);
    }
  }

  async createRecipe({ name, image }) {
    try {
      const recipe = new RecipeModel({
        name,
        image,
        ingredients: [],
      });
      const customerResponse = await recipe.save();
      return customerResponse;
    } catch (error) {
      console.log(error);
    }
  }

  async insertIngredient(recipeId, required_qt, { _id, name, image }) {
    const ingredient = {
      ingredient: { _id, name, image },
      required_qt,
    };
    try {
      const recipe = await RecipeModel.findById(recipeId).populate(
        "ingredients"
      );
      if (recipe) {
        let ingredients = recipe.ingredients;
        if (ingredients.length > 0) {
          let isExists = false;
          ingredients.map((item) => {
            if (
              item.ingredient._id.toString() ===
              ingredient.ingredient._id.toString()
            ) {
              const index = ingredients.indexOf(item);
              ingredients[index].required_qt += parseInt(
                ingredient.required_qt
              );
              isExists = true;
            }
          });
          if (!isExists) {
            ingredients.push(ingredient);
          }
        } else {
          ingredients.push(ingredient);
        }
        recipe.ingredient = ingredients;
      }
      const recipeResult = await recipe.save();
      return recipeResult.ingredients;
    } catch (error) {
      console.log(error);
    }
  }

  async createOrder({ serves_number, recipes }) {
    try {
      const order = new OrderModel({
        serves_number,
        recipes,
      });
      const orderResult = await order.save();
      return orderResult;
    } catch (error) {
      console.log(error);
    }
  }

  async getOrders() {
    try {
      return await OrderModel.find();
    } catch (error) {
      console.log(error);
    }
  }

  async dispatchOrder(orderId) {
    try {
      return await OrderModel.findByIdAndUpdate(orderId, {
        status: "dispatched",
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = KitchenRepository;
