#!/usr/bin/env node
const amqp = require("amqplib");
const readDevice = require("../readDevice");
const SerialPort = require("serialport");

const q = "data";

function startPortsMonitor(config, callback) {
  let openDevices = [];

  function removePort(port) {
    openDevices = openDevices.filter(_ => _ !== port);
  }

  async function connectToPort(port) {
    openDevices.push(port);
    console.log("Connect to port " + port);
    try {
      const conn = await amqp.connect("amqp://localhost");
      const channel = await conn.createChannel();
      await channel.assertQueue(q);

      readDevice(port, {
        onData: async data => {
          await channel.sendToQueue(q, data);
        },
        onClose: () => removePort(port),
        onError: () => removePort(port)
      });
    } catch (e) {
      console.log("Error connection to " + port, e);
      removePort(port);
    }
  }

  function monitorPorts() {
    SerialPort.list(function(err, ports) {
      const siPorts = ports
        .filter(port =>
          config.specifications.find(
            spec =>
              spec.vendorId === port.vendorId &&
              spec.productId === port.productId
          )
        )
        .map(_ => _.comName);

      const newPorts = siPorts.filter(_ => !openDevices.includes(_));
      for (const port of newPorts) {
        connectToPort(port);
      }
    });
  }

  monitorPorts();

  setInterval(monitorPorts, 500);
}

module.exports = startPortsMonitor;
