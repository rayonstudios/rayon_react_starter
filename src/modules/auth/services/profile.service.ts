import apiClient, { withApiResponseHandling } from "@/lib/openapi-fetch.config";
import { isProd, objectToFormData } from "@/lib/utils/misc.utils";
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

const getServiceWorkerRegistration = async () => {
  return await navigator.serviceWorker.register(
    isProd()
      ? "/firebase-messaging-sw-prod.js"
      : "/firebase-messaging-sw-dev.js"
  );
};

const getVapidKey = () => {
  return isProd()
    ? "BIzUscuugFLRQheEyFd8c9ozexgyNhKc5B6gLJ0Ycu-lMsnTZofPSRUJOMOU7sGvUebBIKeJ7biDXTTDf5XDI6s"
    : "BIzUscuugFLRQheEyFd8c9ozexgyNhKc5B6gLJ0Ycu-lMsnTZofPSRUJOMOU7sGvUebBIKeJ7biDXTTDf5XDI6s";
};

const getFcmToken = async () => {
  try {
    const swRegistration = await getServiceWorkerRegistration();
    console.log("Service worker registered:", swRegistration);

    const token = await getToken(firebase.messaging, {
      vapidKey: getVapidKey(),
      serviceWorkerRegistration: swRegistration,
    });

    console.log("FCM token obtained:", token);
    return token;
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return null;
  }
};
const profileService = {
  fetch,
  update,
  getFcmToken,
  deleteFcmToken,
  getServiceWorkerRegistration,
  getVapidKey,
};
export default profileService;
