#!/usr/bin/env node

const defaultPort = 12345;
const defaultHost = "0.0.0.0";
const net = require("net");

function startPortsMonitor(config, callback) {
  function startServer() {
    const server = net.createServer();
    server.listen(
      config.port || defaultPort,
      config.host || defaultHost,
      () => {
        console.log(
          "TCP Server is running on port " + config.port || defaultPort + "."
        );
      }
    );

    server.on("connection", function(sock) {
      console.log("CONNECTED: " + sock.remoteAddress + ":" + sock.remotePort);

      sock.on("data", function(data) {
        callback(data);
      });

      // Add a 'close' event handler to this instance of socket
      sock.on("close", function(data) {
        console.log("CLOSED: " + sock.remoteAddress + " " + sock.remotePort);
      });
    });
  }

  startServer();
}

module.exports = startPortsMonitor;
