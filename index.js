const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const register = require("./routes/register");
const login = require("./routes/login");
const profile = require("./routes/profile");
const cards = require("./routes/cards");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/profile", profile);
app.use("/api/cards", cards);

mongoose
  .connect(process.env.db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log(err));

  app.listen(PORT, () => console.log("Server Started on Port:", PORT));