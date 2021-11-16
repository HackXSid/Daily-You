"use strict";
const express = require("express");
const { medicationGet } = require("../controllers/medication.controller");

const router = express.Router();

router.route("/get").get(medicationGet);

module.exports = { router };
