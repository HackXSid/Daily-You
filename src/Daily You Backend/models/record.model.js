"use strict";

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("record", {
    timeSlot: {
      type: DataTypes.STRING,
    },
  });
};
