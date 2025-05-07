export type IMAGE_SIZE = "small" | "medium" | "large";

export const isImage = (file?: File) => {
  return file?.type?.startsWith("image/");
};

export const sizedImg = <T>(obj: T, field: keyof T, size: IMAGE_SIZE) => {
  if (!obj) return "";

  return (obj as any)[`${field.toString()}_sizes`]?.[size] || obj[field];
};
