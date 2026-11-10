import type { IUser } from "../types/user";
import { users as initialUsers } from "../data/users";

export const USERS_STORAGE_KEY = "users";

export function isValidUser(item: unknown): item is IUser {
  if (!item || typeof item !== "object") {
    return false;
  }

  const user = item as Record<string, unknown>;

  if (typeof user.name !== "string" || !user.name.trim()) {
    return false;
  }

  const hasNameAndValue = (obj: unknown): boolean => {
    if (!obj || typeof obj !== "object") return false;
    const rec = obj as Record<string, unknown>;
    return typeof rec.name === "string" && typeof rec.value === "string";
  };

  return (
    hasNameAndValue(user.department) &&
    hasNameAndValue(user.country) &&
    hasNameAndValue(user.status)
  );
}

export function saveUsersToStorage(usersToSave: IUser[]): void {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return;
    }
    window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersToSave));
  } catch (error) {
    console.error("Помилка збереження користувачів у localStorage:", error);
  }
}

export function loadUsersFromStorage(): IUser[] {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return [...initialUsers];
    }

    const rawData = window.localStorage.getItem(USERS_STORAGE_KEY);

    // Перший запуск: запис у localStorage відсутній
    if (rawData === null) {
      saveUsersToStorage(initialUsers);
      return [...initialUsers];
    }

    const parsed: unknown = JSON.parse(rawData);

    // Перевірка на масив та валідність кожного користувача
    if (!Array.isArray(parsed) || !parsed.every(isValidUser)) {
      console.warn(
        "Дані користувачів у localStorage відсутні або пошкоджені. Відновлюємо початкові дані."
      );
      saveUsersToStorage(initialUsers);
      return [...initialUsers];
    }

    return parsed;
  } catch (error) {
    console.error(
      "Помилка при читанні або парсингу користувачів з localStorage:",
      error
    );
    saveUsersToStorage(initialUsers);
    return [...initialUsers];
  }
}
