const express = require("express");
const mongoose = require("mongoose");

const usersRouter = require("./routes/users");
const { createUser } = require("./controllers/users");

const { PORT = 3001 } = process.env;

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("DB connection error", err));

app.use(express.json());

// ====================== AUTH ROUTES ======================
app.post("/signup", createUser);
// app.post("/signin", login);     // we'll add this later

// ====================== USER ROUTES ======================
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
