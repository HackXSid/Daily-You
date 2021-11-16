"use strict";
const express = require("express");
const {
  createRecord,
  getRecords,
} = require("../controllers/record.controller");

const router = express.Router();

router.route("/create").post(createRecord);
router.route("/get").get(getRecords);

module.exports = { router };
