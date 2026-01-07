const mongoose = require("mongoose");

function connectToDb() {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("connected to DB");
    })
    .catch((error) => {
      console.log("error connecting to Db", error);
    });
}

module.exports = connectToDb;
