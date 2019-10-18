const SerialPort = require("serialport");

const startByte = 0x02;
const endByte = 0x03;

function readDevice(device, {
  onData, onClose, onError
}) {
  const port = new SerialPort(device, { baudRate: 38400 });

  let currentQueue = [];

  port.on("error", function (error) {
    console.error("An error occured reading the device " + device, error);
    onError()
  });

  port.on("data", function (data) {
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
          onData(Buffer.from(currentMessage));
          currentMessage = [];
          hasStarted = false;
        }
      }
    }

    currentQueue = currentMessage;
  });

  port.on("close", function () {
    console.log("Device " + device + " closed.");
    onClose();
  });
}

module.exports = readDevice;
