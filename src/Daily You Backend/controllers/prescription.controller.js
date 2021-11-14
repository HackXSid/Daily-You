"use strict";

const { userGet } = require("../helpers/user.crud");
const sequelize = require("../models/");

const { prescription, medication } = sequelize.models;
const { parseBuffer, parseMedicine } = require("../utils/parseMedicine");

const prescriptionUserGet = async (req, res) => {
  const { phone } = req.body;
  const user = await userGet(phone);
  res.send({ user });
};

const prescriptionCreate = async (req, res) => {
  const { user } = req;
  const { PatientPhoneNumber, diagnosis, tests, medicine, others } = req.body;
  const resp = await prescription.create({
    PatientPhoneNumber,
    diagnosis,
    tests,
    medicine,
    others,
    DoctorPhoneNumber: user.phone_number,
  });
  const medicineList = medicine.split("\n");
  const infos = [];
  medicineList.map((medicine) => {
    parseMedicine(medicine, async (data) => {
      const info = parseBuffer(data);
      await medication.create({
        PatientPhoneNumber,
        PrescriptionId: resp.id,
        drug: info.med_name,
        start_date: new Date(),
        end_date: new Date(info.end),
        text: info.string,
        time: info.times,
      });
      infos.push(info);
      if (infos.length === medicineList.length) {
        res.send({ infos });
      }
    });
  });
};

module.exports = { prescriptionUserGet, prescriptionCreate };
