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
  targets: [{ type: "queue", url: "amqp://localhost", queue: "data" }]
};
