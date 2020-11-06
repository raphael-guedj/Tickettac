var mongoose = require("mongoose");

var journeySchema = mongoose.Schema({
  departure: String,
  arrival: String,
  date: Date,
  departureTime: String,
  price: Number,
});

var userSchema = mongoose.Schema({
  myjourneys: [journeySchema],
  lastName: String,
  firstName: String,
  email: String,
  password: String,
});

var UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
