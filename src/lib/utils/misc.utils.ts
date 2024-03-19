export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const fakeApi = async (
  handler: Function,
  options?: { delayMs?: number; errorRate?: number }
) => {
  const { delayMs = 1000, errorRate = 20 } = options || {};
  await delay(delayMs);
  if (Math.random() < errorRate) throw new Error("Fake error");
  const res = await handler();
  return res;
};
