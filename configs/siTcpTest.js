module.exports = {
  metricsPort: 16666,
  sources: [
    {
      type: "allPorts",
      specifications: [
        { vendorId: "10c4", productId: "800a" },
        { vendorId: "10c4", productId: "89C6" }
      ]
    }
  ],
  targets: [
    //{ type: "port", port: "/Users/yannisgu/dev/tty1" },
    //{ type: "queue", url: "localhost", queue: "backup" }
    { type: "siTcpServer", port: 6666 }
  ]
};
