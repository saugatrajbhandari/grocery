const mongoose = require("mongoose");

export const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("db connected");
  } catch (error) {
    console.log("connecting error", error);
  }
};
