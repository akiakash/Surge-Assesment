import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function ValidationTextFields() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function addnotes() {
    axios
      .post(`http://localhost:4000/NotesManagement`, {
        title: title,
        description: description,
      })
      .then((res) => {
        console.log(res);
        alert("succesfullt notes are added");
      })
      .catch((err) => {
        console.log(err);
        alert("something error");
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
      <div style={{ marginTop: "10%" }}>
        <center>
          <TextField label="Title" onChange={(e) => setTitle(e.target.value)} />
          <TextField
            label="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </center>
      </div>
      <center>
        <Button variant="contained" onClick={addnotes}>
          Save
        </Button>
        <a href="/viewnotes">
          <Button variant="contained" style={{ marginLeft: "10px" }}>
            ViewNotes
          </Button>
        </a>
      </center>
    </Box>
  );
}
