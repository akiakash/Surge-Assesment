const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cookie = require("cookie-parser");
JWT_SECRET = "akiakash";

router.get("/register", (req, res) => {
  res.render("register");
});

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "akiagash12@gmail.com",
    pass: "ghoayzrpvjuyrcwu",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({
      name,
      email,
      password,
      emailToken: crypto.randomBytes(64).toString("hex"),
      isVerified: false,
    });
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);
    user.password = hashPassword;
    const newUser = await user.save();
    //send verification mail

    var mailOptions = {
      from: '"Verify your email"<akiagash12@gmaik.com',
      to: user.email,
      subject: "codewithaki - verify your email",
      html: `<h2> ${user.name}! thanks for registering on our site </h2>
    <h4> please verify your mail to continue..</h4>
    <a href="http://${req.headers.host}/user/verify-email?token=${user.emailToken}">verify your email </a>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("verification email is sent to your gmail account");
      }
    });
    // console.log(res);
    res.status(200).json(newUser);

    //send verification mail
  } catch (err) {
    console.log(err);
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

const createToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET);
};
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      const match = await bcrypt.compare(password, findUser.password);
      if (match) {
        const token = createToken(findUser.id);
        console.log(token);
        res.cookie("access-token", token);
        res.status(200).json(findUser);
      } else {
        console.log("invalid password");
      }
    } else {
      console.log("user not registered");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
