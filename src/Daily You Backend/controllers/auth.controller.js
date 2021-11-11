"use strict";

const { userLogin, userCreate } = require("../helpers/user.crud");
const { generateToken } = require("../constants/authConfig");
const { ValidationError } = require("sequelize");

const loginController = async (req, res) => {
  const { phone, password } = req.body;
  const [validateStatus, user] = await userLogin(phone, password);
  if (validateStatus) {
    const token = await generateToken(phone);
    user["password"] = "";
    res.status(200).send({
      message: "Email and Password valid",
      user,
      token,
    });
  } else {
    res.status(400).send({
      error: "Invalid email and password combination",
    });
  }
  return;
};

const registerController = async (req, res) => {
  const {
    phone_number,
    password,
    name,
    dob,
    gender,
    address,
    emergency_phone_number,
    ethnicity,
    race,
    marital,
  } = req.body;
  const userType = "user";
  try {
    await userCreate(
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
    );
    res
      .status(201)
      .send({ success: true, mssg: "User registered successfully" });
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).send({
        success: false,
        error: "Email address already registered",
      });
    }
  }
};

module.exports = { loginController, registerController };
