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

  async decrementExistence(productId, existence) {
    try {
      const productResult = await this.repository.decrementProductExistence(
        productId,
        existence
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

  async registerBuy(product, quantitySold) {
    try {
      const register = await this.repository.createPurchase({
        product,
        quantitySold: quantitySold.quantitySold,
      });
      return register;
    } catch (error) {
      console.log(error);
    }
  }

  async buyOrNot(product) {
    const productInventory = await this.repository.getProductById(
      product.ingredient._id
    );
    if (productInventory.existence <= product.required_qt) {
      const quantitySold = await this.buyProduct(productInventory._id);
      await this.registerBuy(productInventory, quantitySold);
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

  async placeOrder(products) {
    const productsFlatten = products.flat();

    await Promise.all(
      productsFlatten.map(async (product) => {
        return await this.buyOrNot(product);
      })
    );
    return { message: "Order Processed!" };
  }

  async manageOrder(order) {
    const recipes = order.recipes.map((recipe) => {
      return recipe.ingredients;
    });
    const orderResult = await this.placeOrder(recipes);

    return formatData(orderResult);
  }

  async addPurchase() {
    const productsArray = await this.repository.getProducts();
    console.log(productsArray);
    return formatData(productsArray);
  }
}

module.exports = InventoryService;
