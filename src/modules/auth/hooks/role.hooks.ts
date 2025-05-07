import { useAppSelector } from "@/lib/redux/store";

export enum Role {
  USER = "user",
  ADMIN = "admin",
  SUPER_ADMIN = "super-admin",
}

export const useRole = () => {
  const role = useAppSelector((state) => state.profile.data?.role);
  return role;
};
