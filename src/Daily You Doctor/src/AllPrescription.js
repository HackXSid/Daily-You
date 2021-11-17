import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const mock1 = [
  {
    name: "Wayne Bruce",
    age: 31,
    issuedOn: new Date(),
  },
  {
    name: "David Caps",
    age: 22,
    issuedOn: new Date(),
  },
  {
    name: "Wouton Phillips",
    age: 46,
    issuedOn: new Date(),
  },
  {
    name: "Emily Blackstone",
    age: 18,
    issuedOn: new Date(),
  },
];

export const AllPrescriptions = () => {
  let navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState([]);

  const fetchPrescriptions = async () => {
    setPrescriptions(mock1);
  };

  useEffect(() => {
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
          All Prescriptions
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
