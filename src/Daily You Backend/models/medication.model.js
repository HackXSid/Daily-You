"use strict";

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("medication", {
    drug: {
      type: DataTypes.STRING,
    },
    dose: {
      type: DataTypes.STRING,
    },
    start_date: {
      type: DataTypes.DATEONLY,
    },
    end_date: {
      type: DataTypes.DATEONLY,
    },
    time: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  });
};
