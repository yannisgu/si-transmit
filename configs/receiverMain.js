module.exports = {
  metricsPort: 16666,
  sources: [
    {
      type: "queue",
      url: "amqp://admin:hawaii@10.50.9.181",
      queue: "data"
    },
    /*{
      type: "queue",
      url: "amqp://admin:hawaii@192.168.0.183",
      queue: "data"
    },
    {
      type: "queue",
      url: "amqp://admin:hawaii@192.168.0.184",
      queue: "data"
    },
    {
      type: "queue",
      url: "amqp://admin:hawaii@192.168.0.185",
      queue: "data"
    },
    {
      type: "queue",
      url: "amqp://admin:hawaii@192.168.0.186",
      queue: "data"
    },
    {
      type: "queue",
      url: "amqp://admin:hawaii@192.168.0.187",
      queue: "data"
    },
    {
      type: "tcp",
      port: 12345
    }*/
  ],
  targets: [
    /*{ type: "port", port: "/dev/ttyUSB0" },*/
    /*{ type: "queue", url: "amqp://localhost", queue: "backup" },
    { type: "queue", url: "amqp://localhost", queue: "server" }*/
  ]
};
