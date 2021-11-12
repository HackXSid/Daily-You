const express = require("express");
const compression = require("compression");
const cors = require("cors");
const bodyParser = require("body-parser");

const { sanitiseInput } = require("./utils/sanitise");
const { router: authRouter } = require("./routes/auth.route");
const { router: utilRouter } = require("./routes/util.route");
const passport = require("./constants/passportConfig");

const app = express();

const corsOptions = {
  origin: function (_origin, callback) {
    if (process.env.NODE_ENV !== "production") {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use("*", (req, _res, next) => {
  req.body = sanitiseInput(req.body);
  next();
});

app.use(cors(corsOptions));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use("/api", passport.authenticate("jwt", { session: false }));
app.use("/auth", authRouter);
app.use("/util", utilRouter);

/* eslint-disable no-unused-vars */
app.use(function (err, _req, res, _next) {
  console.error(err);
  res.status(500).send({ error: "Oops: Something broke!" });
});
/* eslint-enable no-unused-vars */

module.exports = {
  app,
};
