#!/usr/bin/env node
const amqp = require("amqplib");
const SerialPort = require("serialport");
const port = new SerialPort("/Users/yannisgu/dev/tty2");

port.write([1, 3, 2, 3, 4, 5, 2, 61]);
