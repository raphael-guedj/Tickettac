var express = require("express");
var router = express.Router();
var JourneyModel = require("../models/journeys");
var UserModel = require("../models/users");

var city = [
  "Paris",
  "Marseille",
  "Nantes",
  "Lyon",
  "Rennes",
  "Melun",
  "Bordeaux",
  "Lille",
];
var date = [
  "2018-11-20",
  "2018-11-21",
  "2018-11-22",
  "2018-11-23",
  "2018-11-24",
];

var dateFormat = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

/* GET login page. */
router.get("/", function (req, res, next) {
  res.render("login", { title: "Express" });
});

/*GET home page. */
router.get("/home", function (req, res, next) {
  res.render("homepage", {});
});

/* GET success page -- page qui s'affiche après avoir interrogé la base de données et qui affiche tous les trains dispos  */
router.post("/success", async function (req, res, next) {
  if (req.session.journeys == undefined) {
    req.session.journeys = [];
  }

  var success = [];
  // console.log(req.body);

  var journey = await JourneyModel.find({
    departure: req.body.departure,
    arrival: req.body.arrival,
    date: req.body.date,
  });
  if (journey.length === 0) {
    res.redirect("/failed");
  } else {
    for (var i = 0; i < journey.length; i++) {
      if (
        journey[i].departure === req.body.departure &&
        journey[i].arrival === req.body.arrival &&
        dateFormat(journey[i].date) === req.body.date
      ) {
        success.push({
          departure: req.body.departure,
          arrival: req.body.arrival,
          date: req.body.date,
          departureTime: journey[i].departureTime,
          price: journey[i].price,
          id: journey[i]._id,
        });
      }
    }
  }
  console.log(success);
  res.render("success", { success });
});

/*oups page */
router.get("/failed", function (req, res, next) {
  res.render("failed", { title: "Express" });
});

/* GET shop page. représente le panier contenant les billets*/
router.get("/shop", function (req, res, next) {
  console.log(req.query);
  var alreadyExists = false;
  for (var i = 0; i < req.session.journeys.length; i++) {
    if (req.session.journeys[i].price == req.query.price) {
      alreadyExists = true;
    }
  }
  if (alreadyExists == false) {
    req.session.journeys.push({
      departure_city: req.query.departure_city,
      arrival_city: req.query.arrival_city,
      date: req.query.date,
      departure_time: req.query.departureTime,
      price: Number(req.query.price),
      id: req.query.id,
    });
  }
  console.log(req.session.journeys);

  res.render("shop", { journeys: req.session.journeys });
});

/* GET mylasttrips page. affiche l'ensemble des trajets effectués par l'utilisateur*/
router.get("/lasttrips", async function (req, res, next) {
  var user = await UserModel.findById(req.session.user.id)
    .populate("journeys")
    .exec();
  console.log(user);
  res.render("lasttrips");
});

// Cette route est juste une verification du Save.
// Vous pouvez choisir de la garder ou la supprimer.
router.get("/result", function (req, res, next) {
  // Permet de savoir combien de trajets il y a par ville en base
  for (i = 0; i < city.length; i++) {
    JourneyModel.find(
      { departure: city[i] }, //filtre

      function (err, journey) {
        console.log(
          `Nombre de trajets au départ de ${journey[0].departure} : `,
          journey.length
        );
      }
    );
  }

  res.render("index", { title: "Express" });
});

module.exports = router;
