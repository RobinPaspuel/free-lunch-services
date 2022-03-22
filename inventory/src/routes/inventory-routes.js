const { aggregate } = require("../database/models/Product");
const InventoryService = require("../services/inventory-service");

module.exports = (app) => {
  const service = new InventoryService();

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

  app.post("/purchases", async (req, res, next) => {
    try {
      const { order } = req.body;
      const { data } = await service.manageOrder(order);
      res.json(data);
    } catch (error) {
      next(error);
    }
  });
};
