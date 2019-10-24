const SerialPort = require("serialport");

function openPort(config) {
  const port = new SerialPort(device, { baudRate: 38400 });
  return function write(data) {
    port.write(data);
  };
}

module.exports = openPort;
