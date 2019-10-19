#!/usr/bin/env node
const amqp = require("amqplib");
import si from "./sportident.js/src/build/si.min.js";
const q = "data";

async function connect() {
  const conn = await amqp.connect("amqp://admin:hawaii@192.168.50.66/");
  const channel = await conn.createChannel();
  await channel.assertQueue(q);

  channel.consume(q, message => {
    const arr = message.content;
    console.log(si.protocol.arr2cardNumber([arr[8], arr[7], arr[6], arr[5]]));
    console.log(si.protocol.arr2cardNumber([arr[8], arr[7], arr[6], arr[5]]));
    console.log(message.content);
    //channel.ack(message);
  });
}

connect();
