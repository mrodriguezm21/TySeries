const express = require("express");
const router = express.Router();
const response = require("./response");
const usersServices = require("../services/users.services");
const { checkApiKey } = require("../middlewares/auth.handler");


router.get("/", checkApiKey, async (req, res) => {
  try {
    const users = await usersServices.list();
    response.success(req, res, users, 200);
  } catch (error) {
    response.error(req, res, "Unexpected Error", error, 500);
  }
});

router.get("/:username", async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await usersServices.listOne(username);
    response.success(req, res, user, 200);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await usersServices.create(req.body);
    response.success(req, res, user, 201);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await usersServices.update(id, req.body);
    response.success(req, res, user, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
