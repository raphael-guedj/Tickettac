var express = require("express");
var router = express.Router();
var journeyModel = require("../models/journeys");

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

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("login", { title: "Express" });
});

router.get("/home", function (req, res, next) {
  res.render("homepage", { title: "Express" });
});

router.get("/failed", function (req, res, next) {
  res.render("failed", { title: "Express" });
});

/* GET success page -- page qui s'affiche après avoir interrogé la base de données et qui affiche tous les trains dispos  */
router.get("/success", function (req, res, next) {
  res.render("success", { title: "Express" });
});

/* GET shop page. représente le panier contenant les billets*/
router.get("/shop", function (req, res, next) {
  res.render("shop", { title: "Express" });
});

/* GET mylasttrips page. affiche l'ensemble des trajets effectués par l'utilisateur*/
router.get("/lasttrips", function (req, res, next) {
  res.render("lasttrips", { title: "Express" });
});

// Cette route est juste une verification du Save.
// Vous pouvez choisir de la garder ou la supprimer.
router.get("/result", function (req, res, next) {
  // Permet de savoir combien de trajets il y a par ville en base
  for (i = 0; i < city.length; i++) {
    journeyModel.find(
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
