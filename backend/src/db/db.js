const mongoose = require("mongoose");

function connectToDb() {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((error) => {
      console.log("Error connecting to Db", error);
    });
}

module.exports = connectToDb;
