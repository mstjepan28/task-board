import { useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";

const Field = {
  CHATROOM_ID: "roomId",
  USERNAME: "username",
} as const;

const Input = ({ name, placeholder }: { name: string; placeholder: string }) => {
  return (
    <label className="block relative">
      <input
        id={name}
        name={name}
        placeholder=""
        className="peer w-full bg-zinc-700 text-white rounded-md p-2 outline-none"
        autoComplete="off"
      />

      <div
        className="
          absolute left-2 -top-2.5 bg-zinc-700 rounded-lg p-1 transition-all
          peer-placeholder-shown:bg-transparent peer-placeholder-shown:top-2.5
        "
      >
        <div className="leading-3 text-xs">{placeholder}</div>
      </div>
    </label>
  );
};

type TSize = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
const Spacer = ({ size }: { size?: TSize | undefined }) => {
  const height = useMemo((): `${number}px` => {
    if (!size) {
      return "8px";
    }

    const pixels = {
      xxs: 1,
      xs: 2,
      sm: 4,
      md: 8,
      lg: 16,
      xl: 32,
      xxl: 64,
    }[size];

    return `${pixels}px`;
  }, [size]);

  return <div style={{ height }} />;
};

export const ChatroomSelectScreen = () => {
  const navigate = useNavigate();

  const joinChatroom = (username: string, roomId: string) => {
    const search = { roomId, username };

    navigate({ to: "/chat/room", search });
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const roomId = formValues[Field.CHATROOM_ID] as string;
    const username = formValues[Field.USERNAME] as string;

    if (!roomId || !username) {
      return;
    }

    joinChatroom(username, roomId);
  };

  return (
    <div className="w-screen h-full flex justify-center items-center">
      <form
        onSubmit={onFormSubmit}
        className="max-w-sm w-full bg-white/10 text-white flex flex-col px-8 py-4 rounded-xl"
      >
        <h2 className="mx-auto border-b mb-4 px-4">Enter Chatroom</h2>

        <Input name={Field.USERNAME} placeholder="Username" />
        <Spacer size="xl" />

        <Input name={Field.CHATROOM_ID} placeholder="Chatroom" />
        <Spacer size="lg" />

        <button type="submit" className="bg-white text-black rounded-lg py-1 cursor-pointer active:bg-white/90">
          <span className="text-sm font-bold uppercase">Enter</span>
        </button>
      </form>
    </div>
  );
};
