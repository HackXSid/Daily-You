import { Divider } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
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

export const Dashboard = ({ token }) => {
  Date.prototype.addHours = function (h) {
    this.setHours(this.getHours() + h);
    return this;
  };

  Date.prototype.addMins = function (h) {
    this.setMinutes(this.getMinutes() + h);
    return this;
  };

  let navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [info, setInfo] = useState([]);
  const [specialOpen, setSpecialOpen] = useState(false);

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const [diagnosis, setDiagnosis] = useState("");
  const [tests, setTests] = useState("");
  const [medicine, setMedicines] = useState("");
  const [others, setOthers] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchPatients = async () => {
    setPatients(mock.slice(0, 6));
  };

  const fetchPrescriptions = async () => {
    setPrescriptions(mock1.slice(0, 6));
  };

  const fetchUser = async () => {
    if (phone.length === 10) {
      const response = await axios.post(
        "http://localhost:8000/api/pres/user",
        {
          phone,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { data } = response;
      const { user } = data;
      if (user) {
        setName(user.name);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, [phone, fetchUser]);

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

  const issuePrescription = async () => {
    const data = {
      PatientPhoneNumber: phone,
      diagnosis,
      tests,
      medicine,
      others,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/api/pres/create",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { data: resData } = response;
      const { infos } = resData;
      setInfo(infos);
      setSpecialOpen(true);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Dialog
        onClose={() => {
          setSpecialOpen(false);
        }}
        open={specialOpen}
        maxWidth={"lg"}
      >
        <div
          style={{
            width: 600,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            margin: 20,
          }}
        >
          <h2
            style={{
              textDecoration: "underline",
              fontWeight: 600,
              textAlign: "center",
              marginBottom: 30,
            }}
          >
            Medication Timeline
          </h2>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
            }}
          >
            {info.map((med, index) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                key={index}
              >
                <p style={{ marginRight: 4 }}>{index + 1}. </p>
                <h4 style={{ marginRight: 10 }}>{med.med_name}</h4>
                <p style={{ marginRight: 10 }}>
                  {" "}
                  Ends On - {new Date(med.end).toDateString()}
                </p>
                <p style={{ marginRight: 5 }}> Time : </p>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  {med.times.map((time) => (
                    <p style={{ marginRight: 10, fontWeight: 600 }}>
                      {new Date(time)
                        .addHours(5)
                        .addMins(30)
                        .toLocaleTimeString("en-US")}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Dialog>
      <Dialog onClose={handleClose} open={open} maxWidth={"lg"}>
        <div
          style={{
            width: 600,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            margin: 20,
          }}
        >
          <h2
            style={{
              textDecoration: "underline",
              fontWeight: 600,
              textAlign: "center",
              marginBottom: 30,
            }}
          >
            Issue Prescription
          </h2>
          <TextField
            required
            id="outlined-required"
            label="Patient Phone Number"
            value={phone}
            fullWidth
            onChange={(event) => setPhone(event.target.value)}
          />
          <TextField
            required
            fullWidth
            id="outlined-required"
            label="Patient Name"
            value={name}
            disabled
            style={{ marginTop: 30 }}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Diagnosis"
            multiline
            style={{ marginTop: 30 }}
            fullWidth
            rows={4}
            value={diagnosis}
            onChange={(event) => setDiagnosis(event.target.value)}
          />
          <TextField
            id="outlined-multiline-flexible1"
            label="Medical Tests"
            fullWidth
            multiline
            style={{ marginTop: 30 }}
            rows={4}
            value={tests}
            onChange={(event) => setTests(event.target.value)}
          />
          <TextField
            id="outlined-multiline-flexible2"
            label="Medications"
            multiline
            style={{ marginTop: 30 }}
            fullWidth
            rows={4}
            value={medicine}
            onChange={(event) => setMedicines(event.target.value)}
          />
          <TextField
            id="outlined-multiline-flexible3"
            label="Other Information"
            multiline
            rows={4}
            value={others}
            style={{ marginTop: 30 }}
            fullWidth
            onChange={(event) => setOthers(event.target.value)}
          />
        </div>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={issuePrescription}>Issue Prescription</Button>
        </DialogActions>
      </Dialog>
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
          <Button variant="outlined" onClick={handleOpen}>
            Issue Prescription
          </Button>
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
