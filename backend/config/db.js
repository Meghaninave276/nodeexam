import mongoose from 'mongoose'
export const connctDB=async(req,res)=>{
    try
    {
        await mongoose.connect("mongodb://localhost:27017/products");
        console.log("mongodb connected");
    }
    catch(err)
    {
         console.log("mongodb connected",err);
    }

}