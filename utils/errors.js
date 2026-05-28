const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONFLICT = 409;
const SERVER_ERROR = 500;

const ERROR_MESSAGES = {
  BAD_REQUEST: "Invalid data passed to the method.",
  UNAUTHORIZED: "Access is unauthorized.",
  FORBIDDEN: "Access is forbidden.",
  NOT_FOUND: "Resource not found.",
  CONFLICT: "A user with this email already exists",
  SERVER_ERROR: "An error has occurred on the server.",
};

module.exports = {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  SERVER_ERROR,
  ERROR_MESSAGES,
};
