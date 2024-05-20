import type { TMessageBody } from "@services/utils";
import dayjs from "dayjs";

const CHANNEL_NAME = "the-group-chat";

// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
const server = Bun.serve<{ username: string }>({
  port: 8080,
  fetch(req, server) {
    const url = new URL(req.url);

    if (url.pathname === "/chat") {
      console.log(JSON.stringify(req, null, 2));
      const username = url.searchParams.get("username");
      const success = server.upgrade(req, { data: { username } });

      return success ? undefined : new Response("WebSocket upgrade error", { status: 400 });
    }

    return new Response("Hello world");
  },
  websocket: {
    message(ws, message) {
      const payload: TMessageBody = {
        type: "message",
        username: ws.data.username,
        message: message.toString(),
        created_at: dayjs().toISOString(),
      };

      server.publish(CHANNEL_NAME, JSON.stringify(payload));
    },
    open(ws) {
      ws.subscribe(CHANNEL_NAME);
      const payload: TMessageBody = {
        type: "join",
        username: ws.data.username,
        message: `${ws.data.username} has entered the chat`,
        created_at: dayjs().toISOString(),
      };

      server.publish(CHANNEL_NAME, JSON.stringify(payload));
    },
    close(ws) {
      ws.unsubscribe(CHANNEL_NAME);
      const payload: TMessageBody = {
        type: "join",
        username: ws.data.username,
        message: `${ws.data.username} has left the chat`,
        created_at: dayjs().toISOString(),
      };

      server.publish(CHANNEL_NAME, JSON.stringify(payload));
    },
  },
});
