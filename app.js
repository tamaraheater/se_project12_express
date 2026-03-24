const express = require("express");

const mongoose = require("mongoose");

const indexRouter = require("./routes/index.js");

const { PORT = 3001 } = process.env;
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {})
  .catch((err) => {
    console.error("DB connection error", err);
  });

app.get("/", (req, res) => {
  res.json({ message: "Hello! Server is alive" });
});

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "69bd65d23b0638e78d9bb614",
  };
  next();
});
app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
