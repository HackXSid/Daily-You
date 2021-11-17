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

router.route("/emergency").post(async (req, res) => {
  const { phone_number } = req.body;
  const { user } = require("../models").models;
  const users = await user.findAll({
    where: {
      emergency_phone_number: phone_number,
    },
    raw: true,
  });
  res.send({ users });
});

module.exports = { router };
