const {
  startByte,
  autoSendCommand,
  controlNumberStart,
  controlNumberLength,
  siCardNumberIndex,
  siCardLength,
  timeIndex,
  timeLength,
  dayFlagIndex
} = require("./constants");

function getNumber(array) {
  var value = 0;
  for (var i = 0; i < array.length; i++) {
    value = value * 256 + array[i];
  }

  return value;
}

function getSiCardNumber(array) {
  if (array[0] === 0x00 && array[1] < 5) {
    return array[1] * 100000 + getNumber(array.slice(2, 4));
  }

  return getNumber(array);
}

function parseAutoSendMessage(data) {
  const array = Array.from(data);
  if (data.length < 13 || data[0] != startByte || data[1] !== autoSendCommand) {
    throw Error("Invalid message", data);
  }

  const controlNumber = getNumber(
    array.slice(controlNumberStart, controlNumberStart + controlNumberLength)
  );
  const siCard = getSiCardNumber(
    array.slice(siCardNumberIndex, siCardNumberIndex + siCardLength)
  );

  const isPm = (array[dayFlagIndex] | 0xfe) === 0xff;
  let time = getNumber(array.slice(timeIndex, timeIndex + timeLength));
  if (isPm) {
    time += 12 * 60 * 60;
  }

  time += array[timeIndex + timeLength] / 256;

  return {
    controlNumber,
    siCard,
    time
  };
}

module.exports = parseAutoSendMessage;
