export const isValidPhone = (phone: string): boolean => {
  const re =
    /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d+)\)?)[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
  return re.test(String(phone));
};

export const isValidEmail = (email: string): boolean => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const isValidMinLength = (str: string, len: number): boolean =>
  typeof str === "string" && str.length >= len;

export const isValidMaxLength = (str: string, len: number): boolean =>
  typeof str === "string" && str.length <= len;

export const isValidName = (name: string): boolean => {
  const re = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/gm;
  return re.test(String(name));
};

function getValidator(
  validationFunc: (val: any, ...args: any[]) => boolean,
  errorMsg: string
) {
  return (_: any, val: any, ...args: any[]): Promise<void> => {
    if (validationFunc(val, ...args)) return Promise.resolve();
    return Promise.reject(errorMsg);
  };
}

const Validations = {
  email: getValidator(isValidEmail, "Email is invalid"),
  minLen: (len: number) => (_: any, str: string) =>
    getValidator(isValidMinLength, `Minimum ${len} characters are required`)(
      undefined,
      str,
      len
    ),
  maxLen: (len: number) => (_: any, str: string) =>
    getValidator(isValidMaxLength, `Maximum ${len} characters are allowed`)(
      undefined,
      str,
      len
    ),
  name: getValidator(isValidName, "Please enter a valid name"),
  phone: getValidator(isValidPhone, "Phone number is invalid"),
  requiredField: (name: string = "This field") => ({
    required: true,
    message: `${name} is required`,
  }),
};

export default Validations;
