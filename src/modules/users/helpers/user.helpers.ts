import { User } from "../types/user.type";

export function getFullName(user: User) {
  return user.first_name + " " + user.last_name;
}
