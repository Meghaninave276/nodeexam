import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
      
    price: {
      type: Number,
      required: true,
    },
    description: String,

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    image: String ,
     
  },
 
  { timestamps: true }
);

export const productcollection =  mongoose.model("Product", productSchema);