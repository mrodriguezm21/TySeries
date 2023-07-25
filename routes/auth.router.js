const express = require("express");
const passport = require("passport");

const router = express.Router();
const response = require("./response");

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    try {
      response.success(req, res, req.user, 200);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
