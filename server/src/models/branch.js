const mongoose = require("mongoose");

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

const Branch = mongoose.model("Branch", branchSchema);

module.exports = Branch;
