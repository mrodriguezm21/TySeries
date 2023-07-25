const { customError } = require("../utils/customError");

const COMPONENT_NAME = "AUTH.HANDLER";

function checkApiKey(req, res, next) {
  const { api } = req.headers;
  if (api !== "1234" || !api) {
    next(customError("Invalid api key", 401, COMPONENT_NAME));
  } else {
    next();
  }
}

function authHandler(req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    throw customError("Missing required fields", 400, COMPONENT_NAME);
  }
  next();
}

module.exports = { authHandler, checkApiKey };
