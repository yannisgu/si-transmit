#!/usr/bin/env node

const readDevice = require("../lib/readDevice");
const startSiServer = require("../lib/targets/siTcpServer");

const sendData = startSiServer();

async function connect() {
  readDevice("/dev/tty.SLAB_USBtoUART", { onData: sendData });
}

connect();
