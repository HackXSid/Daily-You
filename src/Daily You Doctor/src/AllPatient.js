import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import "./Dashboard.css";

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

export const AllPatients = () => {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    setPatients(mock);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const getCards = () => {
    return patients.map((patient) => {
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
            <Button size="small" variant="contained">
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
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            style={{ width: 400 }}
            id="input-with-sx"
            label="Search By Name..."
            variant="standard"
          />
        </Box>
        <h2
          style={{
            textAlign: "center",
            fontWeight: 300,
            textDecoration: "underline",
            marginTop: 20,
          }}
        >
          All Patients
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
      </div>
    </>
  );
};
