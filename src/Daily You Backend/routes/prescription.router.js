"use strict";
const express = require("express");
const {
  prescriptionUserGet,
  prescriptionCreate,
} = require("../controllers/prescription.controller");

const router = express.Router();

router.route("/user").post(prescriptionUserGet);
router.route("/create").post(prescriptionCreate);

module.exports = { router };
