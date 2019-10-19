"use strict";

const express = require("express");
const server = express();
const register = require("prom-client").register;

const Gauge = require("prom-client").Gauge;
let devicesMetric;
function getDevicesMetric() {
  devicesMetric =
    devicesMetric ||
    new Gauge({
      name: "connectedDevices",
      help: "Number of connected devices"
    });

  return devicesMetric;
}
let mqServersMetric;
function getMqServersMetric() {
  mqServersMetric =
    mqServersMetric ||
    new Gauge({
      name: "mqServers",
      help: "Status of connected MQ servers",
      labelNames: ["server"]
    });
  return mqServersMetric;
}

function startMonitorServer(port) {
  server.get("/metrics", (req, res) => {
    res.set("Content-Type", register.contentType);
    res.end(register.metrics());
  });

  console.log(
    `Monitor server listening to ${port}, metrics exposed on /metrics endpoint`
  );
  server.listen(port);
}

module.exports = {
  startMonitorServer,
  getDevicesMetric,
  getMqServersMetric
};
