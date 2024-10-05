import { useAppSelector } from "@/lib/redux/store";

export const useRole = () => {
  const role = useAppSelector((state) => state.profile.data?.role);
  return role;
};
