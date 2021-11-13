"use strict";

const applyExtraSetup = (sequelize) => {
  const { user, prescription, medication, record } = sequelize.models;

  prescription.belongsTo(user, { as: "Patient" });
  prescription.belongsTo(user, { as: "Doctor" });

  medication.belongsTo(user, { as: "Patient" });
  medication.belongsTo(prescription, { as: "Prescription" });

  record.belongsTo(medication, { as: "Record" });
};

module.exports = { applyExtraSetup };
