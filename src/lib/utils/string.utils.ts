export const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const kebabCaseToWords = (str: string) => {
  return str
    .split("-")
    .map((word) => capitalize(word))
    .join(" ");
};

export const randString = (len: number = 8) =>
  window
    .btoa(
      Array.from(window.crypto.getRandomValues(new Uint8Array(len * 2)))
        .map((b) => String.fromCharCode(b))
        .join("")
    )
    .replace(/[+/]/g, "")
    .substring(0, len);

export const stringToNumberInRange = (
  text: string,
  min: number,
  max: number
) => {
  // Calculate a hash value from the input string
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash += text.charCodeAt(i);
  }

  // Map the hash value to the desired range
  const range = max - min + 1;
  const mappedValue = ((hash % range) + range) % range;

  // Add the minimum value to get the final result within the range
  const result = min + mappedValue;

  return result;
};
