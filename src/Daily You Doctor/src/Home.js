import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResponsiveDrawer from "./Drawer";
import { Dashboard } from "./Dashboard";
import { AllPatients } from "./AllPatient";
import { AllPrescriptions } from "./AllPrescription";
import { Profile } from "./Profile";

export const Home = ({ logout }) => {
  return (
    <>
      <BrowserRouter>
        <ResponsiveDrawer logout={logout}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<AllPatients />} />
            <Route path="/prescriptions" element={<AllPrescriptions />} />
            <Route path="/users/:profileID" element={<Profile />} />
          </Routes>
        </ResponsiveDrawer>
      </BrowserRouter>
    </>
  );
};
