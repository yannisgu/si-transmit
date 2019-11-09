module.exports = {
  metricsPort: 16666,
  sources: [
    {
      type: "queue",
      url: "amqp://admin:hawaii@192.168.0.188",
      queue: "backup"
    }
  ],
  targets: [
    { type: "port", port: "/dev/ttyUSB0" },
    { type: "queue", url: "amqp://localhost", queue: "server" }
  ]
};
