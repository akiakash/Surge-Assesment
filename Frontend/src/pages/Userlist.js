import React, { useState, useEffect } from "react";
import axios from "axios";

import { Button } from "@mui/material";

function Userlist() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const getRequest = () => {
    axios
      .get(`http://localhost:4000/UserManagement`)
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRequest();
  }, [users]);

  function logout(req) {
    req.session.destroy();
  }

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Type to search"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <table style={{ border: "40px black ", width: "100%" }}>
        <tr>
          <th style={{ border: "1px solid #dddddd" }}>username</th>
          <th style={{ border: "1px solid #dddddd" }}>ID</th>
          <th style={{ border: "1px solid #dddddd" }}>firstname</th>
          <th style={{ border: "1px solid #dddddd" }}>lastname</th>
          <th style={{ border: "1px solid #dddddd" }}>email</th>
          <th style={{ border: "1px solid #dddddd" }}>dateofbirth</th>
        </tr>

        {users
          .filter((val) => {
            if (searchTerm == "") {
              return val;
            } else if (
              val.username
                .toLocaleLowerCase()
                .includes(searchTerm.toLocaleLowerCase())
            ) {
              return val;
            }
          })
          .map((item) => (
            <tr>
              <td>
                {" "}
                <center>{item.username}</center>
              </td>
              <td>
                {" "}
                <center>{item.id}</center>
              </td>
              <td>
                {" "}
                <center>{item.firstname}</center>
              </td>
              <td>
                {" "}
                <center>{item.lastname}</center>
              </td>
              <td>
                {" "}
                <center>{item.email}</center>
              </td>
              <td>
                {" "}
                <center>{item.dateofbirth}</center>
              </td>
            </tr>
          ))}
      </table>
      <center>
        <a href="/login">
          <Button
            variant="contained"
            style={{ marginLeft: "10px" }}
            onClick={logout}
          >
            Logout
          </Button>
        </a>
      </center>
    </div>
  );
}

export default Userlist;
