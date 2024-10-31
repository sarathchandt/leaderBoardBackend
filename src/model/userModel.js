import mongoose from "mongoose";
import { number } from "zod";


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
  },
  password:{
    type:String,
    required: true
  },
  score:{
    type:Number,
    default:0
  }
},{timestamps:true});



export default mongoose.model("User", userSchema);


