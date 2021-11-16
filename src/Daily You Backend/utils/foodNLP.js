"use strict";
const axios = require("axios");

const axiosInstance = axios.default.create({
  baseURL: "https://trackapi.nutritionix.com",
});

const dotenvfile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
require("dotenv").config({ path: dotenvfile });

const NUTRITIONIX_API_KEY = process.env.NUTRITIONIX_API_KEY;
const NUTRITIONIX_APP_ID = process.env.NUTRITIONIX_APP_ID;

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers.post["x-app-id"] = NUTRITIONIX_APP_ID;
axiosInstance.defaults.headers.post["x-app-key"] = NUTRITIONIX_API_KEY;
axiosInstance.defaults.headers.post["x-remote-user-id"] = 0;

const endpoint = {
  NLP_NUTRITION_ENDPOINT: "v2/natural/nutrients",
};

const nutritionalInfo = async (req, res) => {
  const message = req.body.text;
  const timezone = "Asia/Kolkata";

  const response = await axiosInstance.post(endpoint.NLP_NUTRITION_ENDPOINT, {
    query: message,
    timezone: timezone,
  });
  const { data } = response;
  res.send(data);
};

module.exports = { nutritionalInfo };
