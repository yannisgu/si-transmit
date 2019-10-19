const amqp = require("amqplib");
const retrySeconds = 5;

function openQueue(config) {
  let channel;
  async function connect() {
    try {
      const conn = await amqp.connect(config.url);
      conn.on("close", e => {
        console.log(
          `Connection to server ${config.url} closed, reconnect in ${retrySeconds} seconds`,
          e.message
        );
        setTimeout(connect, retrySeconds * 1000);
      });
      conn.on("error", e => {
        console.log(
          `Connection to server ${config.url} closed, reconnect in ${retrySeconds} seconds`,
          e.message
        );
        setTimeout(connect, retrySeconds * 1000);
      });
      channel = await conn.createChannel();
      await channel.assertQueue(config.queue, { durable: true });
    } catch (e) {
      console.log(
        `Could not connect to server ${config.url}, reconnect in ${retrySeconds} seconds`,
        e.message
      );
      setTimeout(connect, retrySeconds * 1000);
    }
  }

  connect();

  return async function(data) {
    await channel.sendToQueue(config.queue, data);
  };
}

module.exports = openQueue;
