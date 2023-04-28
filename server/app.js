const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Chao mung ban den voi binh nguyen vo tan.",
  });
});

module.exports = app;
