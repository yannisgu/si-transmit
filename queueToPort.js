#!/usr/bin/env node
const amqp = require("amqplib");
const SerialPort = require("serialport");

const port = new SerialPort("/Users/yannisgu/dev/tty3");
const q = "tasks";

async function connect() {
  const conn = await amqp.connect("amqp://localhost");
  const channel = await conn.createChannel();
  await channel.assertQueue(q);

  channel.consume(q, message => {
    console.log(message.content);
    port.write(message.content);
    if (message.fields) {
      channel.ack(message);
    } else {
      console.warn("no fields", message);
    }
  });
}

connect();
