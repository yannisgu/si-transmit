const SerialPort = require("serialport");

function readDevice(device, { onData, onClose, onError }) {
  const port = new SerialPort(device, { baudRate: 38400 });

  port.on("error", function(error) {
    console.error("An error occured reading the device " + device, error);
    onError();
  });

  port.on("data", function(data) {
    onData(Buffer.from(data.filter(_ => _ !== 0xff)));
  });

  port.on("close", function() {
    console.log("Device " + device + " closed.");
    onClose();
  });
}

module.exports = readDevice;
