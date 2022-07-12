const http = require('http');
const WebSocket = require('ws');
const port = 4444;
const server = http.createServer();
const wss = new WebSocket.Server({ server, host: 'localhost' });

wss.on('connection', (ws) => {
  ws.eventNames();

  ws.on('open', () => {
    console.log('[open]');
  });

  //connection is up, let's add a simple simple event
  ws.on('message', (message) => {
    //log the received message and send it back to the client
    console.log('received: %s', message);

    wss.clients.forEach((client) => {
      client.send(message);
    });
  });
});

//start our server
server.listen(port, () => {
  console.log(`Data stream server started on port ${port}`);
});
