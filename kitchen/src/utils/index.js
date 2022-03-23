const amqplib = require("amqplib");
const {
  MESSAGE_BROKER_URL,
  EXCHANGE_NAME,
  QUEUE_NAME,
  KITCHEN_BINDING_KEY,
} = require("../config");

module.exports.formatData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("No Data");
  }
};

// Message Broker

// Create Channel
module.exports.createChannel = async () => {
  try {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "direct", false);
    return channel;
  } catch (error) {
    throw error;
  }
};

// Publish Message
module.exports.publishMessage = async (channel, binding_key, message) => {
  try {
    await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
  } catch (error) {
    throw error;
  }
};

// Subscribe Message
module.exports.subscribeMessage = async (channel, service) => {
  const appQueue = await channel.assertQueue(QUEUE_NAME);
  channel.bindQueue(appQueue.queue, EXCHANGE_NAME, KITCHEN_BINDING_KEY);
  channel.consume(appQueue.queue, (data) => {
    service.subscribeEvents(data.content.toString());
    channel.ack(data);
  });
};
