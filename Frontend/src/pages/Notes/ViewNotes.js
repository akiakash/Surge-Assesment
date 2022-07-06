import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

function ViewNotes() {
  const [notes, setNotes] = useState([]);
  const getRequest = () => {
    axios
      .get(`http://localhost:4000/NotesManagement`)
      .then((res) => {
        console.log(res.data);
        setNotes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRequest();
  }, [notes]);

  function deleteNotes(_id) {
    alert("Are you confirm to delete?");
    fetch(`http://localhost:4000/NotesManagement//${_id}`, {
      method: "DELETE",
    }).then((response) => {
      response.json();
      alert("Staff Successfully Deleted...!");
    });
  }

  function updateNotes(_id) {
    console.log("Notes" + _id);
    window.sessionStorage.setItem("NotesID", _id);
    window.location("/updatenotes");
  }

  return (
    <div>
      <table style={{ border: "40px black ", width: "100%" }}>
        <tr>
          <th style={{ border: "1px solid #dddddd" }}>title</th>
          <th style={{ border: "1px solid #dddddd" }}>description</th>
          <th style={{ border: "1px solid #dddddd" }}>edit</th>
          <th style={{ border: "1px solid #dddddd" }}>Delete</th>
        </tr>
        {notes.map((item) => (
          <tr>
            <td>
              {" "}
              <center>{item.title}</center>
            </td>
            <td>
              {" "}
              <center>{item.description}</center>
            </td>
            <td>
              <center>
                <a href="/updatenotes">
                  <Button
                    variant="contained"
                    onClick={() => updateNotes(item._id)}
                  >
                    Edit
                  </Button>
                </a>
              </center>
            </td>
            <td>
              <center>
                <Button
                  variant="contained"
                  onClick={() => deleteNotes(item._id)}
                >
                  Delete
                </Button>
              </center>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default ViewNotes;
