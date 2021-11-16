"use strict";

const { userGet } = require("../helpers/user.crud");
const sequelize = require("../models/");

const { prescription, medication, token } = sequelize.models;
const { parseBuffer, parseMedicine } = require("../utils/parseMedicine");
const { addSchedule } = require("../schedule");

Date.prototype.toCustomTimeString = function () {
  let hours = this.getHours();
  let ampm = "AM";
  if (hours >= 12) {
    ampm = "PM";
    hours %= 12;
  }
  let mins = this.getMinutes();
  if (mins < 10) mins = "0" + mins;
  return hours + ":" + mins + " " + ampm;
};

Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
};

Date.prototype.addMins = function (h) {
  this.setMinutes(this.getMinutes() + h);
  return this;
};

const prescriptionUserGet = async (req, res) => {
  const { phone } = req.body;
  const user = await userGet(phone);
  res.send({ user });
};

const prescriptionGet = async (req, res) => {
  const { user } = req;
  const prescriptions = await prescription.findAll({
    where: {
      PatientPhoneNumber: user.phone_number,
    },
    include: ["Doctor"],
    raw: true,
  });
  res.send({ prescriptions });
};

const parseTimeString = (time) => {
  return { hr: parseInt(time.slice(0, 2)), min: parseInt(time.slice(3, 5)) };
};

const prescriptionCreate = async (req, res) => {
  const { user } = req;
  const { PatientPhoneNumber, diagnosis, tests, medicine, others } = req.body;
  const tokenInfo = await token.findOne({
    where: { userPhoneNumber: PatientPhoneNumber },
    raw: true,
  });
  const tokId = tokenInfo.id;
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
      for (
        let d = new Date();
        d <= new Date(info.end);
        d.setDate(d.getDate() + 1)
      ) {
        info.times.forEach((time) => {
          let copy = d;
          copy.setHours(time.getHours());
          copy.setMinutes(time.getMinutes());
          addSchedule(
            copy,
            tokId,
            `${info.med_name} is due at ${copy
              .addHours(5)
              .addMins(30)
              .toCustomTimeString()}`,
            "Medication Reminder"
          );
        });
      }
      infos.push(info);
      if (infos.length === medicineList.length) {
        res.send({ infos });
      }
    });
  });
};

module.exports = { prescriptionUserGet, prescriptionCreate, prescriptionGet };
