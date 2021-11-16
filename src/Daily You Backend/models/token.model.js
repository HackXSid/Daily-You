"use strict";

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("token", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });
};
