const { aggregate } = require("../database/models/Product");
const InventoryService = require("../services/inventory-service");
const { publishMessage, subscribeMessage } = require("../utils");
const { KITCHEN_BINDING_KEY } = require("../config");

module.exports = (app, channel) => {
  const service = new InventoryService();
  subscribeMessage(channel, service);

  app.post("/products", async (req, res, next) => {
    try {
      const { name, image, existence } = req.body;
      const { data } = await service.addProduct({ name, image, existence });
      res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get("/products", async (req, res, next) => {
    try {
      const { data } = await service.getProducts();
      res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get("/purchases", async (req, res, next) => {
    try {
      const { data } = await service.getPurchases();
      res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.put("/ingredients", async (req, res, next) => {
    try {
      const { recipeId, required_qt, productId } = req.query;
      const { data } = await service.getProductPayload(
        { recipeId, required_qt, productId },
        "ADD_INGREDIENT_TO_RECIPE"
      );
      publishMessage(channel, KITCHEN_BINDING_KEY, JSON.stringify(data));
      res.json(data.data.product);
    } catch (error) {
      next(error);
    }
  });
};
