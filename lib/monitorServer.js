"use strict";

const express = require("express");
const server = express();
const register = require("prom-client").register;

const Gauge = require("prom-client").Gauge;
const devicesMetric = new Gauge({
  name: "connectedDevices",
  help: "Number of connected devices"
});

function startMonitorServer() {
  server.get("/metrics", (req, res) => {
    res.set("Content-Type", register.contentType);
    res.end(register.metrics());
  });

  console.log(
    "Monitor server listening to 16666, metrics exposed on /metrics endpoint"
  );
  server.listen(16666);
}

module.exports = {
  startMonitorServer,
  devicesMetric
};
