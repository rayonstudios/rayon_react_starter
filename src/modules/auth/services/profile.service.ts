import { fakeApi } from "@/lib/utils/misc.utils";
import { Profile } from "../types/profile.type";

async function fetch() {
  const email = localStorage.getItem("accessToken");
  return fakeApi(
    () => ({
      id: "1",
      name: "John Doe",
      email,
      role: email?.includes("admin") ? "admin" : "user",
      picture: "https://via.placeholder.com/150",
    }),
    { errorRate: 0 }
  ) as Promise<Profile>;
}

const profileService = {
  fetch,
};

export default profileService;
