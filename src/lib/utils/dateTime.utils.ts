import dayjs from "dayjs";
import { getRootContextValues } from "../contexts/root.context";
import { Timestamp } from "firebase/firestore";

export const formattedDate = (date: dayjs.ConfigType) => {
  return dayjs(date).toDate().toLocaleDateString(getRootContextValues().lang);
};

export const formattedTime = (date: dayjs.ConfigType) => {
  return dayjs(date).toDate().toLocaleTimeString(getRootContextValues().lang);
};

export const formattedDateTime = (date: dayjs.ConfigType) => {
  return date
    ? dayjs(date).toDate().toLocaleString(getRootContextValues().lang)
    : "-";
};

export const toDate = (value: any) => {
  if (!value) return null;
  const date =
    value instanceof Date
      ? value
      : value instanceof Timestamp
        ? value.toDate()
        : dayjs(value).toDate();
  return isNaN(date.getTime()) ? null : date;
};
