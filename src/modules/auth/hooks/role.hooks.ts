import { useAppSelector } from "@/lib/redux/store";

export { Role } from "@/lib/types/openapi-fetch";

export const useRole = () => {
  const role = useAppSelector((state) => state.profile.data?.role);
  return role;
};
