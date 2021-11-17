import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import Chip from "@mui/material/Chip";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function createData(name, calories, fat, carbs, protein, price, q) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    q,
    history: [
      {
        date: "2020-01-05",
        customerId: "09:00 PM",
        amount: "On Time",
        delay: "2 mins",
      },
      {
        date: "2020-01-02",
        customerId: "10:00 AM",
        amount: "Early",
        delay: "1hr 30 mins",
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const errorColor = "#f5abba";
  const warningColor = "#f5e6ab";
  const successColor = "white";

  let color = successColor;

  if (row.price < 25) {
    color = errorColor;
  } else if (row.protein < 50) {
    color = warningColor;
  }

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        style={{ background: color }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">
          <Chip label={row.carbs + "%"} color="success" />
        </TableCell>
        <TableCell align="right">
          <Chip label={row.protein + "%"} color="error" />
        </TableCell>
        <TableCell align="right">
          <Chip label={row.price + "%"} color="warning" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Record Time
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Delay</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">{historyRow.delay}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ medication }) {
  const rows = medication.map((med) => {
    return createData(
      med["drug"],
      med["dose"],
      new Date(med["start_date"]).toDateString(),
      med["progress"],
      med["delay"],
      med["success"]
    );
  });
  return (
    <TableContainer component={Paper} style={{ marginTop: 30 }}>
      <Table aria-label="collapsible table">
        <TableHead style={{ background: "#deddd9" }}>
          <TableRow>
            <TableCell />
            <TableCell>Drug</TableCell>
            <TableCell align="right">Dose</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">Progress</TableCell>
            <TableCell align="right">On Time</TableCell>
            <TableCell align="right">On Track</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
