const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dateofbirth: {
    type: Date,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
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
    required: true,
  },
  emailToken: {
    type: String,
  },
  isVerified: {
    type: Boolean,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("akash", userSchema);
