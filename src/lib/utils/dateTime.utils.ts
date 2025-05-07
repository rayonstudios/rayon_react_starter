import dayjs from "dayjs";
import { getRootContextValues } from "../contexts/root.context";

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
