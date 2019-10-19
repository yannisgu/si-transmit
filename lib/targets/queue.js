const amqp = require("amqplib");

function openQueue(config) {
  let channel;
  async function connect() {
    const conn = await amqp.connect(config.url);
    channel = await conn.createChannel();
    await channel.assertQueue(config.queue, { durable: true });
  }

  connect();

  return async function(data) {
    await channel.sendToQueue(config.queue, data);
  };
}

module.exports = openQueue;
