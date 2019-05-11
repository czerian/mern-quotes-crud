const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuoteSchema = new Schema(
  {
    id: Number,
    message: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("quote", QuoteSchema);
