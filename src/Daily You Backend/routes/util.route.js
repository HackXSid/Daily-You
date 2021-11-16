"use strict";
const express = require("express");
const { parseBuffer, parseMedicine } = require("../utils/parseMedicine");
const { nutritionalInfo } = require("../utils/foodNLP");
const router = express.Router();

router.route("/parseMedicine").get((req, res) => {
  const medicine = req.query.medicine;
  const state = req.query.state;
  parseMedicine(medicine, (data) => {
    const info = parseBuffer(data);
    res.send({ info, state });
  });
});

router.route("/foodnlp").post(nutritionalInfo);

module.exports = { router };
