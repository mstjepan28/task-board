import React, { useEffect, useState } from "react";

export const Chat = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connectionOpened, setConnectionOpened] = useState(false);

  const [messageList, setMessageList] = useState<string[]>([]);

  interface OpenConnectionProps {
    onOpen?: (socket: WebSocket) => void;
    onClose?: (socket: WebSocket) => void;
    onMessage?: (message: string) => void;
  }
  const openNewConnection = (props?: OpenConnectionProps) => {
    const { onOpen, onClose, onMessage } = props || {};

    const newSocket = new WebSocket("ws://localhost:8080");

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

  useEffect(() => {
    if (!connectionOpened) {
      openNewConnection();
    }

    return () => {
      socket?.close();
      setSocket(null);
    };
  }, []);

  const sendMessage = (message: string) => {
    if (connectionOpened) {
      socket?.send(message);
      return;
    }

    const onOpen = (socket: WebSocket) => socket.send(message);

    openNewConnection({ onOpen });
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    const messageInput = formElement[0] as HTMLInputElement;

    sendMessage(messageInput.value);
  };

  return (
    <div className="h-[100svh] w-full flex flex-col items-center justify-center bg-gray-500">
      <div className="w-2/3 basis-full flex flex-col justify-end">
        <div className="basis-full">
          <div className="h-full max-h-full overflow-y-auto">
            {messageList.map((message, index) => (
              <div key={index} className="flex justify-end">
                <div className="bg-blue-500 text-white p-2 rounded-lg">{message}</div>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={onFormSubmit}
          className="flex items-stretch  overflow-hidden rounded-lg focus-within: border-blue-600"
        >
          <input type="text" className="basis-full p-2 outline-none ring-0" />
          <button type="submit" className="p-2 bg-white">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
