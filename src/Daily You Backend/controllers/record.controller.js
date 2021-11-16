"use strict";

const sequelize = require("../models/");

const { record } = sequelize.models;

const createRecord = async (req, res) => {
  const { timeSlot, MedicationId, PatientPhoneNumber } = req.body;
  await record.create({
    timeSlot,
    MedicationId,
    PatientPhoneNumber,
  });
  res.send({ success: true });
};

const getRecords = async (req, res) => {
  const { PatientPhoneNumber } = req.query;
  const records = await record.findAll({
    where: {
      PatientPhoneNumber,
    },
    raw: true,
  });
  res.send({ records });
};

module.exports = { createRecord, getRecords };
