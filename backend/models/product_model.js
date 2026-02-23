import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "categories", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }, 
  },
  { timestamps: true }
);

export const Productcollection = mongoose.model("products", productSchema);