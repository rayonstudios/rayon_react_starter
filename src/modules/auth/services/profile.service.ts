import apiClient, { withApiResponseHandling } from "@/lib/openapi-fetch.config";
import { isDev, objectToFormData } from "@/lib/utils/misc.utils";
import { getToken } from "firebase/messaging";
import { firebase } from "../../../lib/firebase/firebase.service";
import { ProfileUpdateBody } from "../types/profile.types";

async function fetch() {
  const { data } = await withApiResponseHandling(apiClient.GET("/profile"));
  return data;
}

async function update(payload: ProfileUpdateBody) {
  console.log("Profile update payload:", payload);
  const formData = objectToFormData(payload);
  console.log("FormData entries:", Array.from(formData.entries()));

  const { data } = await withApiResponseHandling(
    apiClient.PATCH("/profile", {
      body: payload,
      bodySerializer: (body) => {
        console.log("bodySerializer called with:", body);
        const fd = objectToFormData(body);
        console.log("bodySerializer returning FormData:", fd);
        return fd;
      },
    })
  );
  return data;
}

async function deleteFcmToken(fcmToken: string) {
  const { data } = await withApiResponseHandling(
    //@ts-ignore
    apiClient.DELETE("/profile/{fcmToken}", {
      params: { path: { fcmToken } },
    })
  );
  return data;
}

export const getFcmToken = async () => {
  const swRegistration = await navigator.serviceWorker.register(
    isDev() ? "/firebase-messaging-sw-dev.js" : "/firebase-messaging-sw-prod.js"
  );
  await navigator.serviceWorker.ready;
  const token = await getToken(firebase.messaging, {
    vapidKey: isDev()
      ? "BIzUscuugFLRQheEyFd8c9ozexgyNhKc5B6gLJ0Ycu-lMsnTZofPSRUJOMOU7sGvUebBIKeJ7biDXTTDf5XDI6s"
      : "BIzUscuugFLRQheEyFd8c9ozexgyNhKc5B6gLJ0Ycu-lMsnTZofPSRUJOMOU7sGvUebBIKeJ7biDXTTDf5XDI6s",
    serviceWorkerRegistration: swRegistration,
  });

  return token;
};
const profileService = {
  fetch,
  update,
  getFcmToken,
  deleteFcmToken,
};
export default profileService;
