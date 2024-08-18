import { LoadingIndicator } from "@services/ui";
import { useState } from "react";
import { useFriendList } from "../hooks/useFriendList";

interface IProps {
  name: string;
}

export const FriendPicker = ({ name }: IProps) => {
  const [pickedFriends, setPickedFriends] = useState<string[]>([]);
  const friendList = useFriendList();

  const onFriendClick = (friendId: string, isSelected: boolean) => {
    if (isSelected) {
      const updatedFriendList = pickedFriends.filter((id) => id !== friendId);
      setPickedFriends(updatedFriendList);
    } else {
      const updatedFriendList = [...pickedFriends, friendId];
      setPickedFriends(updatedFriendList);
    }
  };

  if (friendList.loading.fetching) {
    return (
      <div className="py-2">
        <LoadingIndicator size="md" />
      </div>
    );
  }

  return (
    <div className="flex gap-x-2 items-center">
      <input
        id={name}
        name={name}
        type="text"
        value={pickedFriends.join(",")}
        onChange={() => {}}
        className="sr-only"
      />

      {friendList.data?.length === 0 ? (
        <div>
          <p>No friends found</p>
        </div>
      ) : (
        friendList.data?.map((friend) => {
          const isSelected = pickedFriends.includes(friend.id);

          return (
            <button
              key={friend.id}
              type="button"
              onClick={() => onFriendClick(friend.id, isSelected)}
              className={`text-sm font-semibold px-4 py-1 border border-black rounded-full ${isSelected ? "text-white bg-green-600 border-transparent" : "bg-white"}`}
            >
              {friend.name}
            </button>
          );
        })
      )}
    </div>
  );
};
