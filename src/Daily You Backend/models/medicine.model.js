"use strict";

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("medicine", {
    name: {
      type: DataTypes.STRING,
    },
    qty: {
      type: DataTypes.INTEGER,
    },
    prohibitedFood: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  });
};
