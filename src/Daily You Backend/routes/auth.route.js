"use strict";
const express = require("express");
const {
  loginController,
  registerController,
} = require("../controllers/auth.controller");
const passport = require("../constants/passportConfig");

const router = express.Router();

router.route("/register").post(registerController);
router.route("/login").post(loginController);
router
  .route("/jwt")
  .all(passport.authenticate("jwt", { session: false }))
  .get((_req, res) => {
    res.send({ verified: true });
  });

module.exports = { router };
