import mongoose from 'mongoose'
const categoryschema=new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    
},{timestamps:true});
export const categorycollection=mongoose.model("categry",categoryschema);