module.exports = {
  metricsPort: 16666,
  sources: [
    {
      type: "tcp",
      port: 12345
    }
  ],
  targets: [
    //{ type: "port", port: "/Users/yannisgu/dev/tty1" },
    //{ type: "queue", url: "localhost", queue: "backup" }
    { type: "siTcpServer", port: 6666 }
  ]
};
