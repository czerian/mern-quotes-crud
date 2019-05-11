const express = require("express");
const router = express.Router();

const Citie = require("../../models/Citie");

router.get("/", (req, res) => {
  Citie.find((err, city) => {
    if (err) return res.json({ error: err });
    return res.json(city);
  });
});

router.post("/", (req, res) => {
  const city = new Citie();
  const { name, population, country } = req.body;
  if (!name || !population) {
    return res.json({
      success: false,
      error: "Please provide valid inputs",
    });
  }
  city.name = name;
  city.population = population;
  city.country = country;
  city.save(err => {
    if (err) return res.json({ error: err });
    return res.json(city);
  });
});

// router.post("/", (req, res) => {
//   const newCitie = new Citie({
//     name: req.body.name,
//     population: req.body.population,
//     country: req.body.country,
//   });
//   newCitie.save().then(citie => res.json(citie));
// });

router.get("/id/:id", (req, res) => {
  Citie.findById(req.params.id)
    .then(city => {
      if (city) {
        res.json(city);
      } else {
        res.status(404).json({ status: 404 });
      }
    })
    .catch(err => res.status(404).json({ error: err }));
});

router.delete("/id/:id", (req, res) => {
  Citie.findById(req.params.id)
    .then(city => city.remove().then(() => res.json(city)))
    .catch(err => res.status(404).json({ error: err }));
});

router.get("/name/:name", (req, res) => {
  Citie.findOne({ name: req.params.name })
    .then(city => {
      if (city) {
        res.json(city);
      } else {
        res.status(404).json({ status: 404 });
      }
    })
    .catch(err => res.status(404).json({ error: err }));
});

router.get("/country/:country", (req, res) => {
  Citie.find({ country: req.params.country })
    .then(city => {
      if (city) {
        res.json(city);
      } else {
        res.status(404).json({ status: 404 });
      }
    })
    .catch(err => res.status(404).json({ error: err }));
});

module.exports = router;
