import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";

export default function ValidationTextFields() {
  const id = window.sessionStorage.getItem("NotesID");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/NotesManagement/${id}`)
      .then((response) => {
        //   console.log(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);

        setNotes(response.data);
        console.log(response.data);
      });
  }, []);

  function updateNotes() {
    axios
      .patch(`http://localhost:4000/NotesManagement/${id}`, {
        title: title,
        description: description,
      })
      .then((response) => {
        window.location = "/viewnotes";
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
      <div style={{ marginTop: "10%" }}>
        <center>
          <input
            label="Title"
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={notes.title}
            style={{
              borderRadius: "5px",
              width: "200px",
              height: "40px",
              marginRight: "10px",
            }}
          />
          <input
            label="Description"
            onChange={(e) => setDescription(e.target.value)}
            defaultValue={notes.description}
            style={{ borderRadius: "5px", width: "200px", height: "40px" }}
          />
        </center>
      </div>
      <center>
        <Button
          variant="contained"
          onClick={updateNotes}
          style={{ marginTop: "10px" }}
        >
          Update
        </Button>
      </center>
      <center>
        <a href="/viewnotes">
          <Button variant="contained" style={{ marginTop: "10px" }}>
            View Notes
          </Button>
        </a>
      </center>
    </Box>
  );
}
