const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Profile = Schema(
  {
    username: {
      type: String,
    },
    name: String,
    profession: String,
    DOB: String,
    titleline: String,
    about: String,
    img: {
      type: String,
      default: "",
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Profile", Profile);