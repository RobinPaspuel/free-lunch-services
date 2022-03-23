const KitchenService = require("../services/kitchen-service");
const { publishMessage, subscribeMessage } = require("../utils");
const { INVENTORY_BINDING_KEY } = require("../config");

module.exports = (app, channel) => {
  const service = new KitchenService();
  subscribeMessage(channel, service);

  app.post("/recipes", async (req, res, next) => {
    try {
      const { name, image } = req.body;
      const { data } = await service.AddRecipe({ name, image });
      return res.json(data);
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
      const payload = await service.getOrderPayload(data, "ADD_NEW_ORDER");
      publishMessage(channel, INVENTORY_BINDING_KEY, JSON.stringify(payload));
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
