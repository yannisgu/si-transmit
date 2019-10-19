function openPort(config) {
  const port = new SerialPort(config.port);
  return function write(data) {
    port.write(data);
  };
}
