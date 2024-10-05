import { fakeApi } from "@/lib/utils/misc.utils";
import { Profile } from "../types/profile.type";

async function fetch() {
  return fakeApi(
    () => ({
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "admin",
      picture: "https://via.placeholder.com/150",
    }),
    { errorRate: 0 }
  ) as Promise<Profile>;
}

const profileService = {
  fetch,
};

export default profileService;
