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

  async insertIngredient(
    recipeName,
    required_qt,
    { _id, name, existence, image }
  ) {
    const ingredient = {
      ingredient: { _id, name, existence, image },
      required_qt,
    };
    try {
      const recipe = await RecipeModel.findOne({ name: recipeName}).populate(
        "ingredients"
      ).exec();
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

  async getOrders(received, dispatched) {
    try {
      if (received && !dispatched) {
        return await OrderModel.find({ status: "received" }).populate('recipes').exec();
      } else if (dispatched && !received) {
        return await OrderModel.find({ status: "dispatched" }).populate('recipes').exec();
      } else {
        return await OrderModel.find().populate('recipes').exec();
      }
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
