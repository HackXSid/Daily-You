import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PatientTable from "./PatientTable";
import axios from "axios";

Date.prototype.toCustomTimeString = function () {
  let hours = this.getHours();
  let ampm = "AM";
  if (hours >= 12) {
    ampm = "PM";
    hours %= 12;
  }
  let mins = this.getMinutes();
  if (mins < 10) mins = "0" + mins;
  return hours + ":" + mins + " " + ampm;
};

Date.prototype.getCurrentTime = function () {
  let hours = this.getHours();
  let mins = this.getMinutes();
  return hours * 60 + mins;
};

Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
};

Date.prototype.addMins = function (h) {
  this.setMinutes(this.getMinutes() + h);
  return this;
};

const getTimeStringRecord = (date) => {
  let hours = date.getHours();
  let mins = date.getMinutes();
  if (hours < 10) hours = "0" + hours;
  if (mins < 10) mins = "0" + mins;
  return hours + ":" + mins;
};

const datediff = (first, second) => {
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
};

const getTimeFromString = (time) => {
  const hours = parseInt(time.slice(0, 2));
  const mins = parseInt(time.slice(3, 5));

  return hours * 60 + mins;
};

export const Profile = () => {
  const [medication, setMedication] = React.useState([]);
  const params = useParams();
  const { profileID } = params;

  const authReducer = useSelector((state) => state.authenticationReducer);
  const { token } = authReducer;

  const fetch = async () => {
    const BACKEND_URL = "http://localhost:8000/";
    const response = await axios.post(
      BACKEND_URL + "api/med/doctorGet",
      {
        phone_number: "9051633165",
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const { data } = response;
    const { medications } = data;

    setMedication(
      medications.map((med) => {
        const total = datediff(
          new Date(med["start_date"]),
          new Date(med["end_date"])
        );
        const done = datediff(new Date(med["start_date"]), new Date());

        const progress = Math.round((done / total) * 100);

        let delay = 0;
        const { records } = med;
        const daysPassed = datediff(new Date(med["start_date"]), new Date());

        const pillsConsumedIdeal = daysPassed * med["time"].length;
        const pillsConsumedActual = records.length;
        records.forEach((record) => {
          const { timeSlot, createdAt } = record;
          const actualTime = new Date(createdAt).getCurrentTime();
          const recordTime = getTimeFromString(timeSlot);

          const diff = Math.max(
            30,
            100 - Math.abs(actualTime - recordTime) / 10 + 30
          );

          delay += diff / 2;
        });
        if (records.length) delay /= records.length;

        const success =
          pillsConsumedIdeal === 0
            ? 0
            : Math.round((pillsConsumedActual / pillsConsumedIdeal) * 100);

        delay = Math.round(delay);

        return {
          drug: med["drug"],
          dose: med["extraInfo"]["dosage"],
          start_date: new Date(med["start_date"]),
          end_date: new Date(med["end_date"]),
          time: med["time"].map((tm) => new Date(tm)),
          text: med["text"],
          progress: progress,
          delay: delay,
          success: success,
          extraInfo: med["extraInfo"],
          id: med["id"],
          records: med["records"],
          original: med,
        };
      })
    );
  };

  useEffect(() => {
    fetch();
  }, []);

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
      <PatientTable medication={medication} />
    </>
  );
};
