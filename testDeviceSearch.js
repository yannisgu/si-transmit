var SerialPort = require("SerialPort");
SerialPort.list(function(err, ports) {
  console.log(ports);
});
