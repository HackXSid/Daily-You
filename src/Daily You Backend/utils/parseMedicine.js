"use strict";

const { spawn } = require("child_process");

const parseMedicine = (string, cb) => {
  const pyProg = spawn("python3", ["utils/parseMedicine.py", string]);
  pyProg.stdout.on("data", cb);
};

const parseBuffer = (buffer) => {
  const message = buffer.toString();
  const splitLines = (str) => str.split(/\r?\n/);
  const info = splitLines(message);
  const end = new Date(info[0]);
  const med_name = info[1];
  const times = info[2]
    .split(",")
    .map((time) => new Date("1970-01-01T" + time + ":00Z"));
  return {
    end,
    med_name,
    times,
  };
};

module.exports = { parseBuffer, parseMedicine };
