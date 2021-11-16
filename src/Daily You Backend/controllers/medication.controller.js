"use strict";
const sequelize = require("../models/");
const { medicines: medicineInfos } = require("../constants/");

const { medication, record } = sequelize.models;

const medicationGet = async (req, res) => {
  const { user } = req;
  const medications = await medication.findAll({
    where: {
      PatientPhoneNumber: user.phone_number,
    },
    raw: true,
  });
  const info = await Promise.all(
    medications.map(async (med) => {
      const extraInfo = medicineInfos[med.drug] || {};
      const records = await record.findAll({
        where: {
          MedicationId: med.id,
        },
        raw: true,
      });
      return { ...med, extraInfo, records };
    })
  );
  res.send({ medications: info });
};

module.exports = { medicationGet };
