const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitieSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    population: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = Citie = mongoose.model("citie", CitieSchema);

// module.exports = mongoose.model("city", CitieSchema);
