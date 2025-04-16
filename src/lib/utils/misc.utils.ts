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

export function isDev() {
  return import.meta.env.VITE_ENV === "dev";
}

export function isNullish(value: any) {
  return [null, undefined, ""].includes(value);
}

export const fileNameFromUrl = (url: string) => {
  return decodeURIComponent(url.split("?")?.[0]?.split("/").pop() || "");
};
