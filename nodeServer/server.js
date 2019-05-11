const mongoose = require("mongoose");
const express = require("express");
const bp = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/cities", require("./routes/api/cities"));
app.use("/api/quotes", require("./routes/api/quotes"));

const dbURI = "mongodb+srv://muli:getOUT00@dreams-pim8y.mongodb.net/coffee?retryWrites=true";
mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true });
let db = mongoose.connection;
db.once("open", () => console.log("MongoDB successfully connected..."));
db.on("error", console.error.bind(console, "Connection to MongoDB failed, error:"));

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use(morgan("dev"));

// Serve reactClient/build static files
app.use(express.static(path.join(__dirname, "../reactClient/build")));
// Sent Not Found's/404's to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../reactClient/build/index.html"));
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`All hail the new king... ${PORT}`);
});
