const { ProductModel, PurchaseModel } = require("../models");

class InventoryRepository {
  async createProduct({ name, image, existence }) {
    try {
      const product = new ProductModel({
        name,
        image,
        existence,
      });
      const productResult = await product.save();
      return productResult;
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      return await ProductModel.find();
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(productId) {
    try {
      return await ProductModel.findById(productId);
    } catch (error) {
      console.log(error);
    }
  }

  async incrementProductExistence(productId, existence) {
    try {
      return await ProductModel.findByIdAndUpdate(productId, {
        $inc: { existence: existence },
      });
      return ProductModel.findById(productId);
    } catch (error) {
      console.log(error);
    }
  }

  async decrementProductExistence(productId, existence) {
    try {
      await ProductModel.findByIdAndUpdate(productId, {
        $inc: { existence: -existence },
      });
      return ProductModel.findById(productId);
    } catch (error) {
      console.log(error);
    }
  }

  async createPurchase({ product, quantitySold }) {
    try {
      const purchase = new PurchaseModel({
        product,
        quantitySold,
      });
      const purchaseResult = await purchase.save();
      return purchaseResult;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = InventoryRepository;
