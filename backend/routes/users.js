var express = require('express');
var router = express.Router();
var UserModel = require("../models/users");


// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* POST sign-up page. */
router.post('/sign-up', async function(req, res, next) {
  var userExists = await UserModel.findOne(
    { email: req.body.email }
  );
  if (userExists) {
    res.redirect('/'); 
  } else {
    var newUser = new UserModel ({
      lastName : req.body.lastname,
      firstName: req.body.firstname,
      email: req.body.email,
      password: req.body.password,
    });
    newUser = await newUser.save();
    req.session.user = {
      lastName : req.body.lastname,
      firstName: req.body.firstname,
      id: newUser._id
    }
    res.redirect('/home');
  }
});

/* POST sign-in page. */
router.post('/sign-in', async function(req, res, next) {
  var userExists = await UserModel.findOne(
    { 
      email: req.body.email,
      password: req.body.password
    });
  if (userExists) {
    req.session.user = {
      lastName: userExists.lastName,
      firstName: userExists.firstName,
      id: userExists._id
    }
    // console.log(req.session.user);
    res.redirect('/home')
  } else {
    res.redirect('/');
  }
});

module.exports = router;
