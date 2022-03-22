const KitchenService = require("../services/kitchen-service");

module.exports = (app) => {
  const service = new KitchenService();

  app.post("/recipes", async (req, res, next) => {
    try {
      const { name, image } = req.body;
      const { data } = await service.AddRecipe({ name, image });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.put("/ingredients", async (req, res, next) => {
    try {
      const { recipeId, required_qt } = req.query;
      const ingredient = req.body;
      const { data } = await service.addIngredient(
        recipeId,
        required_qt,
        ingredient
      );
      return res.json(ingredient);
    } catch (error) {
      next(error);
    }
  });

  app.get("/recipes", async (req, res, next) => {
    try {
      const { data } = await service.getRecipes();
      res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.post("/orders", async (req, res, next) => {
    try {
      const { serves_number } = req.query;
      const { data } = await service.addOrder(serves_number);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get("/orders", async (req, res, next) => {
    try {
      const { data } = await service.getOrders();
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.put("/orders", async (req, res, next) => {
    try {
      const { orderId } = req.query;
      const { data } = await service.dispatchOrder(orderId);
      res.json(data);
    } catch (error) {
      next(error);
    }
  });
};
