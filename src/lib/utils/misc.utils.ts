export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const fakeApi = async (
  handler: Function,
  options?: { delayMs?: number; errorRate?: number }
) => {
  const { delayMs = 1000, errorRate = 20 } = options || {};
  await delay(delayMs);
  if (Math.random() < errorRate / 100) throw new Error("Fake error");
  const res = await handler();
  return res;
};

export const isDev = () => {
  return import.meta.env.VITE_ENV === "dev";
};

export const isNullish = (value: any) => {
  return [null, undefined, ""].includes(value);
};

export const fileNameFromUrl = (url: string) => {
  return decodeURIComponent(url.split("?")?.[0]?.split("/").pop() || "");
};

export const arrayExtend = <T>(arr: Array<T>, count: number) => {
  if (count <= arr.length) return [...arr];
  return [...arr, ...Array(count - arr.length).fill({})];
};

export const objectToFormData = (
  obj?: Record<string, any>,
  formData = new FormData(),
  parentKey = ""
) => {
  if (!obj) return formData;

  for (const key in obj) {
    const propName = parentKey ? `${parentKey}[${key}]` : key;
    if (obj[key] === undefined) continue;
    if (typeof obj[key] === "object" && !(obj[key] instanceof File)) {
      objectToFormData(obj[key], formData, propName);
    } else {
      formData.append(propName, obj[key]);
    }
  }
  return formData;
};
