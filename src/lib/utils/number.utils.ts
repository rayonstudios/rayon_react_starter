export const formattedNumber = (value: number) => {
  return new Intl.NumberFormat("en-US").format(value);
};
