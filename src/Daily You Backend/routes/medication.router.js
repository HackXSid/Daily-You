"use strict";
const express = require("express");
const {
  medicationGet,
  medicationGetDoctor,
} = require("../controllers/medication.controller");

const router = express.Router();

router.route("/get").get(medicationGet);
router.route("/doctorget").post(medicationGetDoctor);

module.exports = { router };
