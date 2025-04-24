import axios from "@/lib/axios.config";

import { User, UserCreate, UserUpdate } from "../types/user.type";

const fetch = async (id: string) => {
  const res = await axios.get<User>(`users/${id}`);
  return res.data;
};

const create = async (data: UserCreate) => {
  const res = await axios.post<User>("users", data);
  return res.data;
};

const update = async (data: UserUpdate) => {
  const res = await axios.patch<User>(`users/${data.id}`, data);
  return res.data;
};

const remove = async (id: string) => {
  const res = await axios.delete<User>(`users/${id}`);
  return res.data;
};

const userService = {
  fetch,
  create,
  update,
  remove,
};

export default userService;
