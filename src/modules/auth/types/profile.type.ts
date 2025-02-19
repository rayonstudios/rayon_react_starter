export enum Role {
  ADMIN = "admin",
  USER = "user",
  SUPER_ADMIN = "super-admin",
}

export type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
  photo?: string;
  fcm_tokens: string[];
};
export type ProfileUpdate =
  | (Partial<Profile> & Omit<Profile, "fcm_tokens">)
  | {
      fcm_token?: string;
      photo?: File;
    };
