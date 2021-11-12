import React from "react";
import { useParams } from "react-router-dom";
import PatientTable from "./PatientTable";

export const Profile = () => {
  const params = useParams();
  const { profileID } = params;

  return (
    <>
      <h1 style={{ fontWeight: 300, textDecoration: "underline" }}>
        Siddharth Singha Roy
      </h1>
      <div
        style={{
          marginTop: 15,
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div>
          <span
            style={{ marginTop: 10, display: "flex", flexDirection: "row" }}
          >
            <h4 style={{ color: "gray", fontWeight: 100, marginRight: 5 }}>
              Contact Info :{" "}
            </h4>
            <h4>{"+91-9051633165"}</h4>
          </span>
          <span style={{ marginTop: 2, display: "flex", flexDirection: "row" }}>
            <h4 style={{ color: "gray", fontWeight: 100, marginRight: 5 }}>
              Age :{" "}
            </h4>
            <h4>{"21 years"}</h4>
          </span>
          <span style={{ marginTop: 2, display: "flex", flexDirection: "row" }}>
            <h4 style={{ color: "gray", fontWeight: 100, marginRight: 5 }}>
              Gender :{" "}
            </h4>
            <h4>{"Male"}</h4>
          </span>
          <span style={{ marginTop: 2, display: "flex", flexDirection: "row" }}>
            <h4 style={{ color: "gray", fontWeight: 100, marginRight: 5 }}>
              Ethnicity :{" "}
            </h4>
            <h4>{"Non-Hispanic"}</h4>
          </span>
        </div>
        <div>
          <span
            style={{ marginTop: 10, display: "flex", flexDirection: "row" }}
          >
            <h4 style={{ color: "gray", fontWeight: 100, marginRight: 5 }}>
              Emergency Info :{" "}
            </h4>
            <h4>{"+91-6290965387"}</h4>
          </span>
          <span style={{ marginTop: 2, display: "flex", flexDirection: "row" }}>
            <h4 style={{ color: "gray", fontWeight: 100, marginRight: 5 }}>
              Race :{" "}
            </h4>
            <h4>{"Asian"}</h4>
          </span>
          <span style={{ marginTop: 2, display: "flex", flexDirection: "row" }}>
            <h4 style={{ color: "gray", fontWeight: 100, marginRight: 5 }}>
              Marital :{" "}
            </h4>
            <h4>{"Not Married"}</h4>
          </span>
          <span style={{ marginTop: 2, display: "flex", flexDirection: "row" }}>
            <h4 style={{ color: "gray", fontWeight: 100, marginRight: 5 }}>
              Address :{" "}
            </h4>
            <h4>{"102, Southern Avenue, Kolkata - 700029"}</h4>
          </span>
        </div>
      </div>
      <PatientTable />
    </>
  );
};
