import type { TMessageBody, TMessageType } from "@services/utils";
import dayjs from "dayjs";

const CHANNEL_NAME = "the-group-chat";

const createMessage = (username: string, type: TMessageType, message?: string) => {
  const formattedMessage = {
    message: message?.trim() ?? "",
    join: `${username} has entered the chat`,
    leave: `${username} has left the chat`,
    clear: "Chat has been cleared",
  }[type];

  const payload: TMessageBody = {
    type,
    username,
    message: formattedMessage,
    created_at: dayjs().toISOString(),
  };

  return JSON.stringify(payload);
};

// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
const server = Bun.serve<{ username: string }>({
  port: 8080,
  fetch(req, server) {
    const url = new URL(req.url);
    const username = url.searchParams.get("username");

    if (url.pathname !== "/chat") {
      return new Response("Not found", { status: 404 });
    }

    const success = server.upgrade(req, { data: { username } });
    if (!success) {
      return new Response("WebSocket upgrade error", { status: 400 });
    }
  },
  websocket: {
    message(ws, msg) {
      const message = createMessage(ws.data.username, "message", msg.toString());
      server.publish(CHANNEL_NAME, message);
    },
    open(ws) {
      ws.subscribe(CHANNEL_NAME);

      const message = createMessage(ws.data.username, "join");
      server.publish(CHANNEL_NAME, message);
    },
    close(ws) {
      ws.unsubscribe(CHANNEL_NAME);

      const message = createMessage(ws.data.username, "leave");
      server.publish(CHANNEL_NAME, message);
    },
  },
});
