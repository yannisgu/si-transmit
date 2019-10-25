const net = require("net");
const port = 6666;
const host = "localhost";

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
