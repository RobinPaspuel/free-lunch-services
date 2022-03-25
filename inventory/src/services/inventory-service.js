const { InventoryRepository } = require("../database");
const { formatData } = require("../utils");
const axios = require("axios").default;

class InventoryService {
  constructor() {
    this.repository = new InventoryRepository();
  }

  async addProduct(userInputs) {
    const { name, image, existence } = userInputs;
    try {
      const productResult = await this.repository.createProduct({
        name,
        image,
        existence,
      });
      return formatData(productResult);
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      const products = await this.repository.getProducts();
      return formatData(products);
    } catch (error) {
      console.log(error);
    }
  }

  async getPurchases() {
    try {
      const purchases = await this.repository.getPurchases();
      return formatData(purchases);
    } catch (error) {
      console.log(error);
    }
  }

  async incrementExistence(productId, existence) {
    try {
      const productResult = await this.repository.incrementProductExistence(
        productId,
        existence
      );
      return productResult.existence;
    } catch (error) {
      console.log(error);
    }
  }

  async decrementExistence(productId, requiredQuantity) {
    try {
      const productResult = await this.repository.decrementProductExistence(
        productId,
        requiredQuantity
      );
      return productResult.existence;
    } catch (error) {
      console.log(error);
    }
  }

  async buyProduct(productId) {
    try {
      const product = await this.repository.getProductById(productId);
      const marketResponse = await axios.get(
        "https://recruitment.alegra.com/api/farmers-market/buy",
        {
          params: {
            ingredient: product.name,
          },
        }
      );
      return marketResponse.data;
    } catch (error) {
      console.log(error);
    }
  }

  async registerBuy(product, quantitySold, orderId) {
    try {
      const register = await this.repository.createPurchase({
        product,
        quantitySold: quantitySold.quantitySold,
        orderId,
      });
      return register;
    } catch (error) {
      console.log(error);
    }
  }

  async buyOrNot(product, orderId) {
    const productInventory = await this.repository.getProductById(
      product.ingredient._id
    );
    if (productInventory.existence <= product.required_qt) {
      const quantitySold = await this.buyProduct(productInventory._id);
      if (quantitySold.quantitySold > 0) {
        await this.registerBuy(productInventory, quantitySold, orderId);
      }
      await this.incrementExistence(
        productInventory,
        quantitySold.quantitySold
      );
      await this.buyOrNot(product);
    } else {
      const actualQauntity = await this.decrementExistence(
        productInventory._id,
        product.required_qt
      );
      if (actualQauntity < 0) {
        await this.buyOrNot(product);
      }
    }
  }

  async placeOrder(products, orderId) {
    const productsFlatten = products.flat();

    await Promise.all(
      productsFlatten.map(async (product) => {
        return await this.buyOrNot(product, orderId);
      })
    );
  }

  async manageOrder(order) {
    try {
      const recipes = order.recipes.map((recipe) => {
        return recipe.ingredients;
      });
      await this.placeOrder(recipes, order._id);
      const orderResult = await axios.put(
        "http://nginx/kitchen/orders",
        {},
        {
          params: {
            orderId: order._id,
          },
        }
      );
      console.log(orderResult.data);
      return formatData(orderResult.data);
    } catch (error) {
      console.log(error);
    }
  }

  async getProductPayload({ recipeName, required_qt, productName }, event) {
    const product = await this.repository.getProductByName(productName);
    if (product) {
      const payload = {
        event: event,
        data: {
          recipeName,
          product,
          required_qt,
        },
      };
      return formatData(payload);
    } else {
      return formatData({ error: "Product not available" });
    }
  }

  async getOrderPayload({ orderId }, event) {
    if (orderId) {
      const payload = {
        event,
        data: {
          orderId,
        },
      };
      return payload;
    } else {
      return formatData({ error: "No order to dispatch" });
    }
  }

  async subscribeEvents(payload) {
    const { event, data } = JSON.parse(payload);
    const { order } = data;

    switch (event) {
      case "ADD_NEW_ORDER":
        this.manageOrder(order);
        break;
      default:
        break;
    }
  }
}

module.exports = InventoryService;
