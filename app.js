const express = require("express");
const mongoose = require("mongoose");

const usersRouter = require("./routes/users");
const { createUser, login } = require("./controllers/users"); // ← Fixed import
const auth = require("./middlewares/auth");

const { PORT = 3001 } = process.env;

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("DB connection error", err));

app.use(express.json());

// ====================== PUBLIC ROUTES ======================
app.post("/signup", createUser);
app.post("/signin", login); // ← Now it should work

// ====================== PROTECTED ROUTES ======================
app.use("/users", auth, usersRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
