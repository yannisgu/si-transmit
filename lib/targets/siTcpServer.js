const startServer = require("./tcpServer");
const parseAutoSendMessage = require("../parseAutoSendMessage");

function startSiServer(config) {
  const broadcast = startServer(config);

  return function onData(rawData) {
    const stamp = parseAutoSendMessage(rawData);
    broadcast(`${stamp.siCard};${stamp.controlNumber};${stamp.time}\n`);
  };
}

module.exports = startSiServer;
