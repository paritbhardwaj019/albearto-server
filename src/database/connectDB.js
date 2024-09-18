const mongoose = require("mongoose");
const config = require("../config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.database.url);

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
