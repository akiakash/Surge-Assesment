import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

export default function ValidationTextFields() {
  function Logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send("Unable to log out");
      } else {
        res.send("Logout successful");
      }
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
        <TextField label="Current Password" />
        <TextField label="New Password" />
        <TextField label="Re-enter Password " />
      </div>
      <Button variant="contained" onClick={Logout}>
        Contained
      </Button>
      <a href="/addnotes">
        <Button variant="contained">AddNotes</Button>
      </a>
    </Box>
  );
}
