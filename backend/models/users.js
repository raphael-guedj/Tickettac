var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  myjourneys: [{ type: mongoose.Schema.Types.ObjectId, ref: "journeys" }],
  lastName: String,
  firstName: String,
  email: String,
  password: String,
});

var UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
