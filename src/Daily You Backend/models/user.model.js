"use strict";

const { DataTypes } = require("sequelize");
const { hash } = require("../utils/encryptDecrypt");

module.exports = (sequelize) => {
  sequelize.define("user", {
    phone_number: {
      type: DataTypes.STRING(16),
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("password", hash(value));
      },
      validate: {
        is: /^\w{6,}$/,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ethnicity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    race: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
    },
    emergency_phone_number: {
      type: DataTypes.STRING(16),
    },
    userType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
