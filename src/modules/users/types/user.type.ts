export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  photo?: string;
  country?: string;
};

export type UserCreate = Omit<User, "id">;

export type UserUpdate = Partial<UserCreate> & Pick<User, "id">;
