#!/usr/bin/env node
const amqp = require("amqplib");
const readDevice = require("./readDevice");
const glob = require('glob')

const q = "data";

let openDevices = []

function removePort(port) {
  openDevices = openDevices.filter(_ => _ !== port);
}

async function connectToPort(port) {
  openDevices.push(port);
  console.log('Connect to port ' + port)
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
  } catch {
    removePort(port)
  }
}


function monitorPorts() {
  glob("/dev/serial/by-id/*SPORTident*", function (er, files) {
    const newPorts = files.filter(_ => !openDevices.includes(_))
    for (const port of newPorts) {
      connectToPort(port)
    }
  })
}

monitorPorts()

setInterval(monitorPorts, 500)