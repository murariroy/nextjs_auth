 import mongoose from "mongoose";
import { type } from "os";

 const userSchema = new mongoose.Schema({
        username:{String,
        required:[true,"Please enter a username"],
        unique:true,
        },
        email:{
            type:String,
            required:[true,"Please provide a password"],
        },
        isVerified:{
            type:Boolean,
            default:false,

        },
        isAdmin:{
            type:Boolean,
            default:false,
        },
        forgotPasswodToken:String,
        forgotPasswodTokkenExpiry:Date,
        verifyToken:String,
        verifyToken:Date,
 })

 const User = mongoose.models.users || mongoose.model("users",userSchema);

 export default User