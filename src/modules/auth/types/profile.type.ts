export enum Role {
  ADMIN = "admin",
  USER = "user",
}

export type Profile = {
  id: string;
  name: string;
  email: string;
  role: Role;
  picture?: string;
};
