"use strict";

const { applyExtraSetup } = require("./association");

const sequelize = require("./database");

const modelDefiners = [
  require("./user.model"),
  require("./prescription.model"),
  require("./medication.model"),
  require("./record.model"),
  require("./medicine.model"),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}
applyExtraSetup(sequelize);

module.exports = sequelize;
