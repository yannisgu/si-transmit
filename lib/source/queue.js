const amqp = require("amqplib");
const retrySecond = 5;
const { getMqServersMetric } = require("../monitorServer");

function listenToQueue(config, callback) {
  const mqServersMetric = getMqServersMetric();

  async function connect() {
    let conn;
    try {
      conn = await amqp.connect(config.url);
      console.log("Connected to MQ server", config.url);
      mqServersMetric.set({ server: config.url }, 1);
    } catch (e) {
      console.error(
        `Could not connect to MQ server ${config.url}, retrying in ${retrySecond} seconds`,
        e.message
      );
      mqServersMetric.set({ server: config.url }, 0);
      setTimeout(connect, retrySecond * 1000);
      return;
    }
    conn.on("close", function(err) {
      console.error(
        `Connection to MQ server ${config.url} lost, retrying in ${retrySecond} seconds`,
        err.message
      );
      mqServersMetric.set({ server: config.url }, 0);
      setTimeout(connect, retrySecond * 1000);
    });
    const channel = await conn.createChannel();
    await channel.assertQueue(config.queue, { durable: true });

    channel.consume(config.queue, message => {
      callback(message.content);

      channel.ack(message);
    });
  }

  connect();
}

module.exports = listenToQueue;
