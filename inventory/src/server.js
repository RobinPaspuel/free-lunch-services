const express = require("express");
const { PORT } = require("./config");
const { databaseConnection } = require("./database");
const appExpress = require("./app-express");

const startServer = async () => {
  const app = express();

  await databaseConnection();

  await appExpress(app);

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
