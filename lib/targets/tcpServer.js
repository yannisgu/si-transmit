const net = require("net");
const defaultPort = 6666;
const defaultHost = "0.0.0.0";

function startServer(config) {
  const server = net.createServer();
  server.listen(config.port || defaultPort, config.host || defaultHost, () => {
    console.log("TCP Server is running on port " + defaultPort + ".");
  });

  let sockets = [];

  server.on("connection", function(sock) {
    console.log("CONNECTED: " + sock.remoteAddress + ":" + sock.remotePort);
    sockets.push(sock);

    // Add a 'close' event handler to this instance of socket
    sock.on("close", function(data) {
      sockets = sockets.filter(_ => _ !== sock);
      console.log("CLOSED: " + sock.remoteAddress + " " + sock.remotePort);
    });
  });

  return function broadcast(data) {
    for (const socket of sockets) {
      socket.write(data);
    }
  };
}

module.exports = startServer;
