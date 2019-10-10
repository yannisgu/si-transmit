#!/usr/bin/env node
const amqp = require("amqplib");
const SerialPort = require("serialport");

const q = "tasks";

async function read() {
  const port = new SerialPort("/Users/yannisgu/dev/tty4");

  port.on("error", function(error) {
    console.error("Error:", error);
  });

  port.on("close", function() {
    console.log("Close");
  });

  port.on("data", async function(data) {
    console.log("Data:", data);
  });

  console.log("done");
}

read();
