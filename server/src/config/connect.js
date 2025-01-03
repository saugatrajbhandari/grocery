const mongoose = require("mongoose");

const connectDB = async (uri) => {
  console.log(uri);
  try {
    await mongoose.connect(uri);
    console.log("db connected");
  } catch (error) {
    console.log("connecting error", error);
  }
};

module.exports = { connectDB };