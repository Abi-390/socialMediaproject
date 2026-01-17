require("dotenv").config();
const express = require("express");
const connectToDb = require("./db/db");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,               
  }))


connectToDb();

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;
