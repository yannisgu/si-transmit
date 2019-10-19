#!/usr/bin/env node
const createSiServer = require("./lib/targets/siTcpServer");
const createPortTarget = require("./lib/targets/port");
const startAllPorts = require("./lib/source/allPorts");
const startQueueSource = require("./lib/source/queue");
const startQueueTarget = require("./lib/targets/queue");
const fs = require("fs");

const targetFunctions = {
  port: createPortTarget,
  siTcpServer: createSiServer,
  queue: startQueueTarget
};

const sourceFunctions = {
  allPorts: startAllPorts,
  queue: startQueueSource
};

function start(sourceConfigs, targetConfigs) {
  const targets = [];

  for (const target of targetConfigs) {
    try {
      const createTarget = targetFunctions[target.type];
      if (createTarget) {
        targets.push(createTarget(target));
      }
    } catch (e) {
      console.error("Could not create target", target, e);
    }
  }

  function onData(data) {
    for (const target of targets) {
      try {
        target(data);
      } catch (e) {
        console.error(e);
      }
    }
  }

  setTimeout(() => {
    for (const source of sourceConfigs) {
      const startSource = sourceFunctions[source.type];
      startSource(source, onData);
    }
  }, 1000);
}

const configPath = process.argv[2];
if (!configPath) {
  console.error("no config file provided.");
  process.exit(1);
  return;
}

if (!fs.existsSync(configPath)) {
  console.error(`Config path ${configPath} does not exists.`);
  process.exit(1);
  return;
}

const config = require(configPath);
start(config.sources, config.targets);
