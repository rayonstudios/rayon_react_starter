import { notification } from "antd";
import { capitalize } from "lodash";

export const getErrorMessage = (
  error: any,
  fallback = "An unknown error occurred!"
) => {
  let message = fallback;
  try {
    error?.preventDefault && error.preventDefault();
    if (typeof error === "string") message = error;
    else if (error.message) {
      if (Array.isArray(error.path) && error.code) {
        // For validation errors, format the message
        message = `${error.path.map((p: string) => capitalize(p)).join(", ")}: ${error.message}`;
      } else message = error.message;
    } else if (error && typeof error === "object")
      message = getErrorMessage(Object.values(error)[0]);
    else message = JSON.stringify(error);

    message = JSON.parse(message);
    message = getErrorMessage(message);
  } catch {}

  return message;
};

export const globalErrorHandler = (
  error: any,
  notificationProps?: Parameters<typeof notification.open>[0]
) => {
  const errorMsg = getErrorMessage(error);
  console.error(errorMsg, error);

  notification.open({
    type: "error",
    message: "Error",
    description: <div className="whitespace-pre-wrap">{errorMsg}</div>,
    duration: 7,
    showProgress: true,
    pauseOnHover: true,
    ...notificationProps,
  });
};

export const suppressError = () => {};
