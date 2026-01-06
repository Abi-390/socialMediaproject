require("dotenv").config();
const express = require("express");
const connectToDb = require("./db/db");
const authRoutes = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());

connectToDb();

app.use(cookieParser());

app.use("/auth", authRoutes);

module.exports = app;
