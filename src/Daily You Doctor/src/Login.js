import React, { useState } from "react";
import "./Login.css";
import axios from "axios";

// Template : https://github.com/Sid200026/Misc-Programs/tree/master/Web%20Dev/Templates/Login

export const Login = ({ login }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const BACKEND_URL = "http://192.168.29.216:8000/";

  const doLogin = async (event) => {
    event.preventDefault();
    const data = { phone, password };
    try {
      const response = await axios.post(BACKEND_URL + "auth/login", data);
      const { data: respData } = response;
      const { user, token } = respData;
      login(user, token);
    } catch (err) {}
  };

  return (
    <>
      <div className="container">
        <div className="holder">
          <form method="post" className="loginform" onSubmit={doLogin}>
            <h2 className="formhead">Welcome To Daily You</h2>
            <label className="label" for="username">
              Phone Number
            </label>
            <input
              id="username"
              className="inp"
              type="text"
              name="phone number"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
            <label className="label" for="password">
              Password
            </label>
            <input
              id="password"
              className="inp"
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <input
              type="submit"
              value="Log In"
              className="form-submit"
              onSubmit={doLogin}
            />
          </form>
        </div>
      </div>
    </>
  );
};
