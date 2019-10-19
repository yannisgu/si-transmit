const amqp = require("amqplib");

async function listenToQueue(config, callback) {
  const conn = await amqp.connect(config.url);
  const channel = await conn.createChannel();
  await channel.assertQueue(config.queue, { durable: true });

  channel.consume(config.queue, message => {
    callback(message.content);

    //channel.ack(message);
  });
}

module.exports = listenToQueue;
