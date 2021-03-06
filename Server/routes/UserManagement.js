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
const { verifyEmail } = require("../config/JWT");
var generator = require("generate-password");

router.get("/register", (req, res) => {
  res.render("register");
});

//the email sending method and the from mail
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

//filter the all registered datas from the database
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

//register method for the users
router.post("/register", async (req, res) => {
  var Password = generator.generate({
    length: 10,
    numbers: true,
  });
  try {
    const {
      id,
      username,
      firstname,
      lastname,
      email,
      dateofbirth,
      mobile,
      Status,
      password,
      accounttype,
    } = req.body;

    const user = new User({
      id,
      username,
      firstname,
      lastname,
      email,
      dateofbirth,
      mobile,
      Status: false,
      password: Password,
      accounttype,
      emailToken: crypto.randomBytes(64).toString("hex"),
      isVerified: false,
      isExistinguser: false,
    });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);
    user.password = hashPassword;
    const newUser = await user.save();
    //send verification mail

    console.log("req.headers.host: ", req.headers.host);
    console.log("user.emailToken : ", user.emailToken);

    var mailOptions = {
      from: '"Verify your email"<akiagash12@gmail.com',
      to: user.email,
      subject: "codewithaki - verify your email",
      html: `<h2> ${user.username}! thanks for registering on our site </h2>
    <h4> please verify your mail to continue..</h4>
    <h5>your temporary password =${Password}</h5>
    <a href="http://${req.headers.host}/UserManagement/verify-email?token=${user.emailToken} ">verify your email </a>`,
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

//mail verification after clicking the link

router.get("/verify-email", async (req, res) => {
  try {
    const token = req.query.token;
    const user = await User.findOne({ emailToken: token });
    if (user) {
      user.emailToken = null;
      user.isVerified = true;
      await user.save();
      res.redirect("http://localhost:3000/login");
      console.log("email is  verified");
    } else {
      console.log("email is not verified");
    }
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

//login method for the users
router.post("/login", verifyEmail, async (req, res) => {
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

//updating the details about users
router.patch("/:userId", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const updatedUser = await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          id: req.body.id,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          dateofbirth: req.body.dateofbirth,
          mobile: req.body.mobile,
          status: req.body.status,
          password: hashPassword,
          isExistinguser: true,
          accounttype: req.body.accounttype,
        },
      }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
