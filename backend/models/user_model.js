import mongoose from 'mongoose'
const userschema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:String,
      products: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }]
},{timestamps:true});
export const usercollection=mongoose.model("users",userschema);