import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ResponsiveDrawer from "./Drawer";
import { Dashboard } from "./Dashboard";
import { AllPatients } from "./AllPatient";
import { AllPrescriptions } from "./AllPrescription";
import { Profile } from "./Profile";

export const Home = ({ logout }) => {
  const authReducer = useSelector((state) => state.authenticationReducer);
  const { user, token } = authReducer;
  const { name } = user;
  return (
    <>
      <BrowserRouter>
        <ResponsiveDrawer logout={logout} name={name}>
          <Routes>
            <Route path="/" element={<Dashboard token={token} />} />
            <Route path="/patients" element={<AllPatients token={token} />} />
            <Route
              path="/prescriptions"
              element={<AllPrescriptions token={token} />}
            />
            <Route
              path="/users/:profileID"
              element={<Profile token={token} />}
            />
          </Routes>
        </ResponsiveDrawer>
      </BrowserRouter>
    </>
  );
};
