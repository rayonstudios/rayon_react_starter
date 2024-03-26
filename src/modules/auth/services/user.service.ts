import { User } from "@/lib/types/user";
import { fakeApi } from "@/lib/utils/misc.utils";

async function fetchProfile() {
  return fakeApi(() => ({
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    picture: "https://via.placeholder.com/150",
  })) as Promise<User>;
}

const userService = {
  fetchProfile,
};

export default userService;
