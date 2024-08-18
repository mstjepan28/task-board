import { AuthContext } from "@services/auth";
import { userSchema } from "@services/auth/src/schemas/userSchema";
import { FirebaseContext } from "@services/firebase";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { z } from "zod";
import { QueryKeys } from "../enums/queryKeys";

export const useFriendList = () => {
  const { authUser } = useContext(AuthContext);
  const { getDocumentListById } = useContext(FirebaseContext);

  const friendList = useQuery({
    queryKey: [QueryKeys.FRIEND_LIST, authUser?.id, authUser?.friends],
    queryFn: async () => {
      if (!authUser?.id) {
        return null;
      }

      const response = await getDocumentListById("users", [authUser.id, ...authUser.friends]);
      return z.array(userSchema).parse(response);
    },
    enabled: !!authUser?.id,
  });

  const getFriendsByIdList = (idList: string[]) => {
    if (!friendList.data) {
      return [];
    }

    return friendList.data.filter((friend) => idList.includes(friend.id));
  };

  return {
    data: friendList.data,

    loading: {
      fetching: friendList.isLoading,
    },

    getFriendsByIdList: getFriendsByIdList,
  };
};
