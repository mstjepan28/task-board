import type { TMessageBody } from "@services/utils";
import type React from "react";
import { useEffect, useState } from "react";

interface IOpenConnectionProps {
  onOpen?: (socket: WebSocket) => void;
  onClose?: (socket: WebSocket) => void;
  onMessage?: (message: string) => void;
}

export const ChatScreen = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connectionOpened, setConnectionOpened] = useState(false);

  const [messageList, setMessageList] = useState<string[]>([]);

  const getUsername = () => {
    const username = new URLSearchParams(window.location.search).get("username");
    const fallback = `Anonymous-${Math.floor(Math.random() * 1000)}`;

    return username || fallback;
  };

  const openNewConnection = (props?: IOpenConnectionProps) => {
    const { onOpen, onClose, onMessage } = props || {};
    const username = getUsername();

    const newSocket = new WebSocket(`ws://localhost:8080/chat?username=${username}`);

    newSocket.onopen = () => {
      if (typeof onOpen === "function") {
        onOpen(newSocket);
      }

      setConnectionOpened(true);
    };
    newSocket.onclose = () => {
      if (typeof onClose === "function") {
        onClose(newSocket);
      }

      setConnectionOpened(false);
    };

    newSocket.onmessage = ({ data }) => {
      if (typeof onMessage === "function") {
        onMessage(data);
      }

      setMessageList((prev) => [...prev, data]);
    };

    setSocket(newSocket);
  };

  const sendMessage = (message: string) => {
    if (connectionOpened && socket) {
      socket.send(message);
    } else {
      openNewConnection({
        onOpen: (socket: WebSocket) => socket.send(message),
      });
    }
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputField = event.currentTarget[0] as HTMLInputElement;
    const message = inputField.value;
    if (!message) {
      return;
    }

    sendMessage(message);

    event.currentTarget.reset();
  };

  useEffect(() => {
    if (!connectionOpened) {
      openNewConnection();
    }

    return () => {
      socket?.close();
      setSocket(null);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setMessageList([])}
        className="text-gray-100/50 absolute top-4 right-8 text-xs cursor-pointer"
      >
        clear
      </button>

      <div className="h-full w-11/12 flex flex-col mx-auto md:w-2/3 py-2">
        <div className="basis-full overflow-y-auto px-2 pt-1 pb-4">
          <div className="h-full max-h-full  flex flex-col gap-y-1">
            {messageList.map((messageStr) => {
              const message = JSON.parse(messageStr) as TMessageBody;
              const key = `${message.username}-${message.created_at}`;

              const isOwnMessage = message.username === getUsername();
              const ownMsgStyle = "ml-auto bg-blue-500 border-blue-600";
              const otherMsgStyle = "mr-auto bg-green-500 border-green-600";

              if (message.type === "message") {
                return (
                  <div
                    key={key}
                    className={`w-fit py-0.5 px-2 rounded-lg border-2 ${isOwnMessage ? ownMsgStyle : otherMsgStyle}`}
                  >
                    <div className="text-sm text-white">{message.message}</div>
                  </div>
                );
              }

              return (
                <div key={key} className="w-full flex justify-center py-2">
                  <div className="text-xs text-gray-100/50">{message.message}</div>
                </div>
              );
            })}
          </div>
        </div>

        <form onSubmit={onFormSubmit} className="rounded-lg w-full flex gap-x-4 text-white bg-white/10 py-2 px-4">
          <input type="text" className="basis-full outline-none ring-0 border-b border-transparent border-b-white" />
          <button type="submit" className="cursor-pointer">
            Send
          </button>
        </form>
      </div>
    </>
  );
};