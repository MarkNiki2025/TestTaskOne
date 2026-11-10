import { createContext, createElement, useContext, useState } from "react";
import type { PropsWithChildren } from "react";
import type { IUser } from "../types/user";
import { loadUsersFromStorage, saveUsersToStorage } from "../utility/userStorage";

interface UsersContextValue {
  userList: IUser[];
  addUser: (newUser: IUser) => void;
  removeUser: (userToRemove: IUser) => void;
  updateUser: (userToUpdate: IUser, updatedUser: IUser) => void;
}

const UsersContext = createContext<UsersContextValue | null>(null);

export function UsersProvider({ children }: PropsWithChildren) {
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

  const updateUser = (userToUpdate: IUser, updatedUser: IUser) => {
    setUserList((prevUsers) => {
      const userIndex = prevUsers.indexOf(userToUpdate);

      if (userIndex === -1) {
        return prevUsers;
      }

      const updated = prevUsers.map((user, index) =>
        index === userIndex ? updatedUser : user
      );
      saveUsersToStorage(updated);
      return updated;
    });
  };

  return createElement(
    UsersContext.Provider,
    { value: { userList, addUser, removeUser, updateUser } },
    children
  );
}

export function useUsers() {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }

  return context;
}
