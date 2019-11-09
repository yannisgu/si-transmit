module.exports = {
  metricsPort: 16666,
  sources: [
    {
      type: "queue",
      url: "amqp://admin:hawaii@10.8.0.22",
      queue: "data"
    }
  ],
  targets: [
    { type: "queue", url: "amqp://admin:hawaii@192.168.0.187", queue: "data" }
  ]
};
