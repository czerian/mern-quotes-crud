const express = require("express");
const router = express.Router();

const Quote = require("../../models/Quote");

router.get("/", (req, res) => {
  Quote.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post("/", (req, res) => {
  const quote = new Quote();
  const { id, message } = req.body;
  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "Please provide valid Quote",
    });
  }
  quote.message = message;
  quote.id = id;
  quote.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post("/update_quote", (req, res) => {
  const { id, update } = req.body;
  Quote.findByIdAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.delete("/del_quote", (req, res) => {
  const { id } = req.body;
  Quote.findByIdAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

module.exports = router;
