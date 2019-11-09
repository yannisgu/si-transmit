module.exports = {
  metricsPort: 16667,
  sources: [
    {
      type: "queue",
      url: "amqp://localhost",
      queue: "server"
    }
  ],
  targets: [{ type: "siTcpServer", port: 6666 }]
};
