import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: { type: String, required: true },

  image: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  quantity: { type: String, required: true },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true,
  },
});

export const Product = mongoose.Schema("Product", productSchema);
