const express = require("express");
const { PORT } = require("./config");
const { databaseConnection } = require("./database");
const appExpress = require("./app-express");
const { createChannel } = require("./utils");

const startServer = async () => {
  const app = express();

  await databaseConnection();

  const channel = await createChannel();

  await appExpress(app, channel);

  app
    .listen(PORT, () => {
      console.log(`Listening to port: ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

startServer();
