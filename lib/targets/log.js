const parseAutoSendMessage = require("../parseAutoSendMessage");

function startLog(config) {
  return function onData(rawData) {
    const stamp = parseAutoSendMessage(rawData);
    console.log(`${stamp.siCard};${stamp.controlNumber};${stamp.time}\n`);
  };
}

module.exports = startLog;
