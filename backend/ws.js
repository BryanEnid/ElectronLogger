const http = require('http');
const ip = require('ip');
const os = require('os');
const networkInterfaces = os.networkInterfaces();
const WebSocket = require('ws');
const port = 4444;
const server = http.createServer();
const wss = new WebSocket.Server({ server, host: 'localhost' });

wss.on('connection', (ws) => {
  ws.eventNames();

  ws.on('open', () => {
    console.log('[Event] open?');
  });

  //connection is up, let's add a simple simple event
  ws.on('message', (message) => {
    //log the received message and send it back to the client
    console.log('[Event] received: %s', message);

    wss.clients.forEach((client) => {
      console.log('[Event] emitting to everyone message!');
      client.send(message);
    });
  });

  ws.on('close', (e) => {
    console.log('[Event] disconnected', e);
  });
});

//start our server
server.listen(port, () => {
  // console.log(networkInterfaces);
  console.log(`Data stream server started ws://${ip.address()}:${port}`);
});
