const amqp = require("amqplib");

async function openQueue(config) {
  const conn = await amqp.connect(config.url);
  const channel = await conn.createChannel();
  await channel.assertQueue(config.queue, { durable: true });

  return async function(data) {
    await channel.sendToQueue(q, data);
  };
}

module.exports = openQueue;
