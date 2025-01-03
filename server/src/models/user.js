const mongoose = require("mongoose");

// Define the Base User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,

    required: true,
    trim: true,
  },

  role: {
    type: String,
    enum: ["Customer", "Admin", "DeliveryPartner"],
  },
  isActivated: { type: Boolean, default: false },
});

// Customer Schema
const customerSchema = new mongoose.Schema({
  ...userSchema.obj,
  phoneNumber: { type: Number, required: true, unique: true },
  role: { type: String, enum: ["Customer"], default: "Customer" },
  liveLocation: {
    longitude: { type: Number },
    latitude: { type: Number },
  },
  address: { type: String },
});

// DeliveryPartner Schema
const DeliveryPartnerSchema = new mongoose.Schema({
  ...userSchema.obj,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  phoneNumber: { type: Number, required: true, unique: true },
  role: { type: String, enum: ["DeliveryPartner"], default: "DeliveryPartner" },
  liveLocation: {
    longitude: { type: Number },
    latitude: { type: Number },
  },
  address: { type: String },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
