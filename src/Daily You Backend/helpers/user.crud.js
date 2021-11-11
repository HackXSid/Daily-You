"use strict";

const sequelize = require("../models/");
const { hash } = require("../utils/encryptDecrypt");

const { user } = sequelize.models;

const userCreate = async (
  phone_number,
  password,
  name,
  dob,
  gender,
  address,
  emergency_phone_number,
  userType,
  ethnicity,
  race,
  marital
) => {
  await user.create({
    phone_number,
    password,
    name,
    dob,
    gender,
    address,
    emergency_phone_number,
    userType,
    ethnicity,
    race,
    marital,
  });
};

const userGet = async (phone) => {
  return await user.findByPk(phone, { raw: true });
};

const userGetEmergency = async (phone) => {
  return await user.findAll({
    where: { emergency_phone_number: phone },
    raw: true,
  });
};

const userLogin = async (phone, password) => {
  const User = await userGet(phone);
  if (!User) return [false, null];
  const hashedPassword = hash(password);
  return [User.password === hashedPassword, User];
};

module.exports = { userCreate, userGet, userLogin, userGetEmergency };
