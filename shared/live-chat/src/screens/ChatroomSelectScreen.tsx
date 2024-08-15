import { Input } from "../components/Input";
import { Spacer } from "../components/Spacer";
import { useChatroom } from "../hooks/useChatroom";

const Field = {
  CHATROOM_ID: "roomId",
  USERNAME: "username",
} as const;

export const ChatroomSelectScreen = () => {
  const room = useChatroom();

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const roomId = formValues[Field.CHATROOM_ID] as string;
    const username = formValues[Field.USERNAME] as string;

    if (!roomId || !username) {
      return;
    }

    room.join(username, roomId);
  };

  return (
    <div className="w-screen h-full flex justify-center items-center">
      <form onSubmit={onFormSubmit} className="max-w-sm w-full bg-white/10  flex flex-col px-8 py-4 rounded-xl">
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
