var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    lastName: String,
    firstName: String,
    email: String,
    password: String,
  });

var UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;