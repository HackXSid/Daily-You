"use strict";
const express = require("express");
const {
  prescriptionUserGet,
  prescriptionCreate,
  prescriptionGet,
} = require("../controllers/prescription.controller");

const router = express.Router();

router.route("/user").post(prescriptionUserGet);
router.route("/create").post(prescriptionCreate);
router.route("/get").get(prescriptionGet);

module.exports = { router };
