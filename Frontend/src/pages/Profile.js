import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function ValidationTextFields() {
  const id = window.sessionStorage.getItem("userID");

  const [ID, setID] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dateofbirth, setDateofbirth] = useState("");
  const [mobile, setMobile] = useState("");
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");
  const [accounttype, setAccounttype] = useState("");

  function updateProfile() {
    axios
      .patch(`http://localhost:4000/UserManagement/${id}`, {
        id: ID,
        firstname: firstname,
        lastname: lastname,
        dateofbirth: dateofbirth,
        mobile: mobile,
        status: status,
        password: password,

        accounttype: accounttype,
      })
      .then((response) => {
        window.location = "/login";
        localStorage.clear();
        console.log(response);

        alert("successfull updated");
      })
      .catch((error) => {
        console.log(error);
        alert("Sorry, Something Error...");
      });
  }
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{ marginLeft: "15%", marginRight: "15%", marginTop: "10%" }}>
        <TextField label="ID" onChange={(e) => setID(e.target.value)} />
        <TextField
          label="First Name"
          onChange={(e) => setFirstname(e.target.value)}
        />
        <TextField
          label="LastName "
          onChange={(e) => setLastname(e.target.value)}
        />
        <TextField
          label="Date OF Birth "
          onChange={(e) => setDateofbirth(e.target.value)}
        />
        <TextField
          label="Mobile "
          onChange={(e) => setMobile(e.target.value)}
        />
        <TextField
          label="Status "
          onChange={(e) => setStatus(e.target.value)}
        />

        <TextField
          label="New Password "
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField label="Re-enter New Password " />
        <FormControl style={{ width: "225px", marginLeft: "6px" }}>
          <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={(e) => setAccounttype(e.target.value)}
          >
            <MenuItem value={"Admin"}>Admin</MenuItem>
            <MenuItem value={"Student"}>Student</MenuItem>
          </Select>
        </FormControl>
      </div>
      <center>
        <Button variant="contained" onClick={updateProfile}>
          Update
        </Button>
      </center>
    </Box>
  );
}
