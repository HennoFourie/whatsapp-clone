import validator from "validator";

export const checkText = (text) => {
  if (text.trim() === "") return "No value supplied";
  return null;
};

export const checkImage = (value) => {
  if (!value === "") return "No image supplied";
  return null;
};

export const checkEmail = (email) => {
  if (email.trim() === "") return "No email supplied";
  if (!validator.isEmail(email)) return "Email is incorrectly formatted";
  return null;
};

export const checkPassword = (password) => {
  if (password.trim() === "") return "No password supplied";
  if (password.length < 8)
    return "Password needs to be more than 8 characters.";
  return null;
};

export const checkConfirm = (confirm, password) => {
  if (confirm.trim() === "") return "No confirm password supplied";
  if (confirm.length < 8)
    return "Confirm password needs to be more than 8 characters.";
  if (confirm !== password)
    return "Password and confirm password are not the same";
  return null;
};
