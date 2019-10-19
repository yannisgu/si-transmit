#!/usr/bin/env node

const readDevice = require("../lib/readDevice");
const parseAutoSendMessage = require("../lib/parseAutoSendMessage");

function now() {
  const date = new Date();
  return (
    date.getHours() * 60 * 60 +
    date.getMinutes() * 60 +
    date.getSeconds() +
    date.getMilliseconds() / 1000
  );
}

async function connect() {
  readDevice("/dev/tty.SLAB_USBtoUART", async data => {
    console.log(data, now());
    const punch = parseAutoSendMessage(data);
    console.log(punch, punch.time - now(), now());
  });
}

connect();
