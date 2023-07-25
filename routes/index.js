const express = require("express");

const series = require("./series.router");
const users = require("./users.router");
const auth = require("./auth.router");

const routerApi = (app) => {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/series", series);
  router.use("/users", users);
  router.use("/auth", auth);
};

module.exports = routerApi;
