const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: false,
  },
  lastname: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dateofbirth: {
    type: Date,
    required: false,
  },
  mobile: {
    type: Number,
    required: false,
  },
  Status: {
    type: Boolean,
  },

  password: {
    type: String,
    required: true,
  },
  accounttype: {
    type: String,
    required: false,
  },
  emailToken: {
    type: String,
  },
  isVerified: {
    type: Boolean,
  },
  isExistinguser: {
    type: Boolean,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("akash", userSchema);
