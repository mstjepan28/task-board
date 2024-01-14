Bun.serve({
  port: 8080,
  fetch(req, server) {
    // upgrade the request to a WebSocket
    if (server.upgrade(req)) {
      return; // do not return a Response
    }
    return new Response("Upgrade failed :(", { status: 500 });
  },
  websocket: {
    // a message is received
    message(ws, message) {
      console.log("WebSocket message received:", message);
      ws.send(message);
    },

    // a socket is opened
    open(ws) {
      console.log("WebSocket opened");
    },

    // a socket is closed
    close(ws, code, message) {
      console.log("WebSocket closed:", code, message);
    },

    // the socket is ready to receive more data
    drain(ws) {
      console.log("WebSocket can receive more data");
    },
  },
});
