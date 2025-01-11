import mongoose from "mongoose";

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
const deliveryPartnerSchema = new mongoose.Schema({
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

// admin Schema
const adminSchema = new mongoose.Schema({
  ...userSchema.obj,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ["Admin"], default: "Admin" },
});

const Customer = mongoose.model("Customer", customerSchema);
const DeliveryPartner = mongoose.model(
  "DeliveryPartner",
  deliveryPartnerSchema
);
const Admin = mongoose.model("Admin", adminSchema);

export { Customer, DeliveryPartner, Admin };
