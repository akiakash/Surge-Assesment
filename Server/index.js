const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cookieparser = require("cookie-parser");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());
app.use(cookieparser());
app.use(express.json());

const UserManagement = require("./routes/UserManagement");
const NotesManagement = require("./routes/NotesManagement");

app.use("/NotesManagement", NotesManagement);

app.use("/UserManagement", UserManagement);

app.get("/", (req, res) => {
  res.send("We are on Home");
});

//connection to mongoDB
mongoose.connect(
  "mongodb+srv://akash:Akiakash1@cluster0.j9maf.mongodb.net/?retryWrites=true&w=majority",
  () => console.log("Successfully connected ")
);

//Server host
app.listen(4000);
