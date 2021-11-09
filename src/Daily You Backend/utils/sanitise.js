"use strict";

const validator = require("validator").default;

const sanitiseInput = (data) => {
  if (typeof data === "object" && data !== null) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        data[`${key}`] = sanitiseInput(data[`${key}`]);
      }
    }
  } else if (typeof data === "string") {
    const sanitisedData = validator.trim(data);
    return sanitisedData;
  }
  return data;
};

module.exports = { sanitiseInput };
