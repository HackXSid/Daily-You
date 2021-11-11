"use strict";

const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { authConfig } = require("./authConfig");
const { userGet } = require("../helpers/user.crud");

const dotenvfile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
require("dotenv").config({ path: dotenvfile });
const secretKey = process.env.SECRET_KEY || "randomKey@123";

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretKey;
opts.algprithms = [authConfig.algorithm];
opts.jsonWebTokenOptions = {
  expiresIn: authConfig.expiresIn,
  algorithm: authConfig.algorithm,
};

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    userGet(jwt_payload.phone)
      .then((user) => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch((err) => {
        done(err);
      });
  })
);

module.exports = passport;
