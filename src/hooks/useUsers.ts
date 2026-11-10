import { useState } from "react";
import type { IUser } from "../types/user";
import { loadUsersFromStorage, saveUsersToStorage } from "../utility/userStorage";

export function useUsers() {
  const [userList, setUserList] = useState<IUser[]>(() => loadUsersFromStorage());

  const addUser = (newUser: IUser) => {
    setUserList((prevUsers) => {
      const updated = [...prevUsers, newUser];
      saveUsersToStorage(updated);
      return updated;
    });
  };

  const removeUser = (userToRemove: IUser) => {
    setUserList((prevUsers) => {
      const updated = prevUsers.filter((user) => user !== userToRemove);
      saveUsersToStorage(updated);
      return updated;
    });
  };

  return {
    userList,
    addUser,
    removeUser,
  };
}
