const PROFILE = "/profile";
const AUTH = "/auth";

export const PATHS = {
  auth: {
    login: `${AUTH}/login`,
    create: `${AUTH}/create`,
    reset: `${AUTH}/reset`,
    landing: `${AUTH}/`,
    email: `${AUTH}/email`,
  },
  profile: {
    landing: `${PROFILE}/`,
  },
};
