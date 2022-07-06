import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";

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
        window.location.reload();

        alert("successfull updated");
      })
      .catch((error) => {
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
      <div>
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
          label="Account Type "
          onChange={(e) => setAccounttype(e.target.value)}
        />
        <TextField
          label="New Password "
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField label="Re-enter New Password " />
      </div>

      <Button variant="contained" onClick={updateProfile}>
        Update
      </Button>
    </Box>
  );
}
