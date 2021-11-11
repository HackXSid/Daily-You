import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ResponsiveDrawer from "./Drawer";
import { Dashboard } from "./Dashboard";
import { AllPatients } from "./AllPatient";
import { AllPrescriptions } from "./AllPrescription";

export const Home = () => {
  return (
    <>
      <BrowserRouter>
        <ResponsiveDrawer>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<AllPatients />} />
            <Route path="/prescriptions" element={<AllPrescriptions />} />
          </Routes>
        </ResponsiveDrawer>
      </BrowserRouter>
    </>
  );
};
