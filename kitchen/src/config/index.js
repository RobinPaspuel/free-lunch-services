const dotenv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotenv.config({ path: configFile });
} else {
  dotenv.config();
}

module.exports = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
  EXCHANGE_NAME: "FREE_LUNCH",
  KITCHEN_BINDING_KEY: "KITCHEN_SERVICE",
  INVENTORY_BINDING_KEY: "INVENTORY_SERVICE",
  QUEUE_NAME: 'KITCHEN_QUEUE'
};
