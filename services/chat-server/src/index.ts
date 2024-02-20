// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
Bun.serve({
  port: 8080,
  fetch(req, server) {
    if (server.upgrade(req)) {
      return;
    }
    return new Response("Upgrade failed :(", { status: 500 });
  },
  websocket: {
    message(ws, message) {
      console.log("WebSocket message received:", message);
      ws.send(message);
    },
    open() {
      console.log("WebSocket opened");
    },
    close(_, code, message) {
      console.log("WebSocket closed:", code, message);
    },
    drain() {
      console.log("WebSocket can receive more data");
    },
  },
});
