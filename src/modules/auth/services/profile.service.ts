import axios from "@/lib/axios.config";
import { messaging } from "@/lib/utils/firebase.config";
import { isDev, objectToFormData } from "@/lib/utils/misc.utils";
import { Profile, ProfileUpdate } from "../types/profile.type";

const fetch = async () => {
  const res = await axios.get<Profile>(`profile/`);
  return res.data;
};
const patch = async (data: ProfileUpdate) => {
  const formData = objectToFormData(data);
  const res = await axios.patch<Profile>(`profile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getFcmToken = async () => {
  const swRegistration = await navigator.serviceWorker.register(
    isDev() ? "/firebase-messaging-sw-dev.js" : "/firebase-messaging-sw-prod.js"
  );
  await navigator.serviceWorker.ready;
  const token = await messaging.getToken({
    vapidKey: isDev()
      ? "BEYFQLzwqu3i0QUmy0ggn7oSliFUj_rlDmMzCNva4xv-ELiuuWDuGOM6XC4kZbLBrVtSxfz7OMvST9lvuoBS4-4"
      : "BJHHnCdIaVaayGFCIIfnOYt4boCgn8lekmrwfYj0WqPjRkZrcw4Ljpw9d144WYLtfiys2oXjseGyjXxZG1STvtY",
    serviceWorkerRegistration: swRegistration,
  });

  return token;
};

const profileService = {
  fetch,
  patch,
  getFcmToken,
};

export default profileService;
