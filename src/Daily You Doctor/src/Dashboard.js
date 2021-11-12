import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const mock1 = [
  {
    name: "Alexandr Wang",
    age: 56,
    issuedOn: new Date(),
  },
  {
    name: "Alexandr Wang",
    age: 56,
    issuedOn: new Date(),
  },
  {
    name: "Alexandr Wang",
    age: 56,
    issuedOn: new Date(),
  },
  {
    name: "Alexandr Wang",
    age: 56,
    issuedOn: new Date(),
  },
  {
    name: "Alexandr Wang",
    age: 56,
    issuedOn: new Date(),
  },
  {
    name: "Alexandr Wang",
    age: 56,
    issuedOn: new Date(),
  },
  {
    name: "Alexandr Wang",
    age: 56,
    issuedOn: new Date(),
  },
];

const mock = [
  {
    name: "Alexandr Wang",
    age: 56,
    prescriptions: 5,
    medicines: [
      {
        name: "Paracetamol",
        status: 1,
      },
      {
        name: "Asthalin",
        status: -1,
      },
      {
        name: "Montair FX",
        status: 0,
      },
    ],
  },
  {
    name: "Alexandr Wang",
    age: 56,
    prescriptions: 5,
    medicines: [
      {
        name: "Paracetamol",
        status: 1,
      },
      {
        name: "Asthalin",
        status: 1,
      },
      {
        name: "Montair FX",
        status: 0,
      },
    ],
  },
  {
    name: "Alexandr Wang",
    age: 56,
    prescriptions: 5,
    medicines: [
      {
        name: "Paracetamol",
        status: 1,
      },
      {
        name: "Asthalin",
        status: 1,
      },
      {
        name: "Montair FX",
        status: 1,
      },
    ],
  },
  {
    name: "Alexandr Wang",
    age: 56,
    prescriptions: 5,
    medicines: [
      {
        name: "Paracetamol",
        status: 1,
      },
      {
        name: "Asthalin",
        status: -1,
      },
      {
        name: "Montair FX",
        status: 0,
      },
    ],
  },
  {
    name: "Alexandr Wang",
    age: 56,
    prescriptions: 5,
    medicines: [
      {
        name: "Paracetamol",
        status: 1,
      },
      {
        name: "Asthalin",
        status: 1,
      },
      {
        name: "Montair FX",
        status: 0,
      },
    ],
  },
  {
    name: "Alexandr Wang",
    age: 56,
    prescriptions: 5,
    medicines: [
      {
        name: "Paracetamol",
        status: 1,
      },
      {
        name: "Asthalin",
        status: 1,
      },
      {
        name: "Montair FX",
        status: 1,
      },
    ],
  },
];

export const Dashboard = () => {
  let navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  const fetchPatients = async () => {
    setPatients(mock.slice(0, 6));
  };

  const fetchPrescriptions = async () => {
    setPrescriptions(mock1.slice(0, 6));
  };

  useEffect(() => {
    fetchPatients();
    fetchPrescriptions();
  }, []);

  const getPrescriptions = () => {
    return prescriptions.map((prescription, index) => {
      return (
        <Card variant="outlined" style={{ width: 360, margin: 10 }} raised>
          <CardContent>
            <Typography variant="h5" component="div">
              {prescription.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Age : {prescription.age}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Issued On : {prescription.issuedOn.toDateString()}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained">
              View Prescription
            </Button>
            <Button size="small">Expire</Button>
            <Button size="small" onClick={() => navigate(`/users/${index}`)}>
              View Profile
            </Button>
          </CardActions>
        </Card>
      );
    });
  };

  const getCards = () => {
    return patients.map((patient, index) => {
      let status = "success";
      if (
        patient.medicines.filter((medicine) => medicine.status === -1).length >
        0
      ) {
        status = "error";
      } else if (
        patient.medicines.filter((medicine) => medicine.status === 0).length > 0
      ) {
        status = "warning";
      }
      return (
        <Card
          variant="outlined"
          style={{ width: 320, margin: 10 }}
          className={`${status}Class`}
          raised
        >
          <CardContent>
            <Typography variant="h5" component="div">
              {patient.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Age : {patient.age}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ mb: 0.5 }}
              color="text.secondary"
            >
              {patient.prescriptions} Prescriptions
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              {patient.medicines.map((medicine) => (
                <Chip
                  style={{ margin: 3 }}
                  label={medicine.name}
                  color={
                    medicine.status === 0
                      ? "warning"
                      : medicine.status === 1
                      ? "success"
                      : "error"
                  }
                />
              ))}
            </div>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              onClick={() => navigate(`/users/${index}`)}
            >
              View Profile
            </Button>
            <Button size="small">Issue Prescription</Button>
          </CardActions>
        </Card>
      );
    });
  };

  return (
    <>
      <div style={{ marginTop: 20 }}>
        <h2
          style={{
            textAlign: "center",
            fontWeight: 300,
            textDecoration: "underline",
          }}
        >
          Quick Actions
        </h2>
        <div
          style={{
            marginTop: 30,
            marginBottom: 20,
            width: "100%",
            justifyContent: "space-evenly",
            display: "flex",
          }}
        >
          <Button variant="outlined">Issue Prescription</Button>
          <Button variant="outlined">Remove Prescription</Button>
          <Button variant="outlined">View Patient</Button>
          <Button variant="outlined">Personal Details</Button>
          <Button variant="outlined">Help</Button>
        </div>
        <Divider />
        <h2
          style={{
            textAlign: "center",
            fontWeight: 300,
            textDecoration: "underline",
            marginTop: 20,
          }}
        >
          Recent Patients
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          {getCards()}
        </div>
        <Divider />
        <h2
          style={{
            textAlign: "center",
            fontWeight: 300,
            textDecoration: "underline",
            marginTop: 20,
          }}
        >
          Recent Prescriptions
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          {getPrescriptions()}
        </div>
        <Divider />
      </div>
    </>
  );
};
