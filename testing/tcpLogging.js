const net = require("net");
const port = 6666;
const host = "127.0.0.1";

function connect() {
  const client = new net.Socket();
  client.connect(port, host, function() {
    console.log("Connected");
  });

  client.on("close", () => {
    console.log("close");
    setTimeout(connect, 1000);
  });

  client.on("error", e => {
    console.log("error", e);
  });

  client.on("data", data => console.log(data.toString()));
}

connect();
