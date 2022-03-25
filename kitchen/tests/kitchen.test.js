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

    await mongoose.connection.collections["recipes"].drop();

    pactum.request.setBaseUrl("http://localhost:3333");
  });
  afterAll(async () => {
    mongoose.disconnect();
  });
  describe("Recipes tests", () => {
    it("Should return the product posted", () => {
      return pactum
        .spec()
        .post("/recipes")
        .withJson({
          name: "test_recipe",
          image: "test_image",
        })
        .expectStatus(200)
        .expectJsonLike({
          name: "test_recipe",
          image: "test_image",
        });
    });

    it("Should return the list of products", () => {
      return pactum.spec().get("/recipes").expectStatus(200);
    });
  });
  describe("Orders tests", () => {
    it("Should return the list of purchases", () => {
      return pactum.spec().get("/orders").expectStatus(200);
    });
  });
});
