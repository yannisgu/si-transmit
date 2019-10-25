const SerialPort = require("serialport");

function openPort(config) {
  const port = new SerialPort(config.port, { baudRate: 38400 });
  return function write(data) {
    port.write(data);
  };
}

module.exports = openPort;
