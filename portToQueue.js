#!/usr/bin/env node
const amqp = require("amqplib");
const readDevice = require("./readDevice");

const q = "tasks";

async function connect() {
  const conn = await amqp.connect("amqp://localhost");
  const channel = await conn.createChannel();
  await channel.assertQueue(q);

  readDevice("/dev/tty.SLAB_USBtoUART", async data => {
    await channel.sendToQueue(q, data);
  });
}

connect();
