module.exports = {
  sources: [
    {
      type: "queue",
      //url: "amqp://admin:hawaii@raspberrypi.local",
      url: "amqp://localhost",
      queue: "data"
    }
  ],
  targets: [
    //{ type: "port", port: "/Users/yannisgu/dev/tty1" },
    //{ type: "queue", url: "localhost", queue: "backup" }
    { type: "siTcpServer", port: 6666 }
  ]
};
