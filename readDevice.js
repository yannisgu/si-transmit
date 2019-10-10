const SerialPort = require("serialport");

const startByte = 0x02;
const endByte = 0x03;

function readDevice(device, callback) {
  const port = new SerialPort(device);

  let currentQueue = [];

  port.on("error", function(error) {
    console.error("An error occured reading the device " + device, error);
  });

  port.on("data", function(data) {
    currentQueue = [...currentQueue, ...data];

    let currentMessage = [];
    let hasStarted = false;
    for (const byte of currentQueue) {
      if (byte === startByte) {
        hasStarted = true;
        currentMessage = [];
      }

      if (hasStarted) {
        currentMessage.push(byte);

        if (byte === endByte) {
          callback(Buffer.from(currentMessage));
          currentMessage = [];
          hasStarted = false;
        }
      }
    }

    currentQueue = currentMessage;
  });

  port.on("close", function() {
    console.log("Device " + device + " closed.");
  });
}

module.exports = readDevice;
