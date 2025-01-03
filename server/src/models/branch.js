import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  liveLocation: {
    longitude: { type: Number },
    latitude: { type: Number },
  },
  address: { type: String },
  deliveryPartners: [
    { type: mongoose.Schema.Types.ObjectId, ref: "DeliveryPartner" },
  ],
});

export const Branch = mongoose.model("Branch", branchSchema);
