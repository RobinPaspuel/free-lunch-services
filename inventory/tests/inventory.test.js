const express = require("express");
const { databaseConnection } = require("../src/database");
const appExpress = require("../src/app-express");
const { createChannel } = require("../src/utils");
const pactum = require("pactum");
const mongoose = require("mongoose");

describe("App e2e tests", () => {
  beforeAll(async () => {
    const app = express();
    await databaseConnection();

    const channel = await createChannel();

    await appExpress(app, channel);

    app.listen(3333);

    await mongoose.connection.collections["products"].drop();

    pactum.request.setBaseUrl("http://localhost:3333");
  });
  afterAll(async () => {
    mongoose.disconnect();
  });
  describe("Produc tests", () => {
    it("Should return the product posted", () => {
      return pactum
        .spec()
        .post("/products")
        .withJson({
          name: "test_product",
          image: "test_image",
        })
        .expectStatus(200)
        .expectJsonLike({
          name: "test_product",
          image: "test_image",
        });
    });

    it("Should return the list of products", () => {
      return pactum.spec().get("/products").expectStatus(200);
    });
  });
  describe("Purchases tests", () => {
    it("Should return the list of purchases", () => {
      return pactum.spec().get("/purchases").expectStatus(200);
    });
  });
  describe("Ingredient tests", () => {
    it("Should return the ingredient added to the recipe", () => {
      return pactum
        .spec()
        .put("/ingredients")
        .withJson({
          recipeName: "test_recipe",
          productName: "test_product",
          required_qt: 5,
        })
        .expectStatus(200)
        .expectJsonLike({
          name: "test_product",
        });
    });
  });
});
