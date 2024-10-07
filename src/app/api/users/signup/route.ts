import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer";






connect();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {username,email,password}= reqBody

        console.log(reqBody);

        //check if user already exist 
        const user= await User.findOne({email})

        if(user){
            return NextResponse.json({error:"user already exists"},{status:400})
        }

        // hash Password

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword= await bcryptjs.hash(password,salt)

        const newUser= new User({
            username,
            email,
            password:hashedPassword
        })
        const savedUser = await newUser.saved()
        console.log(savedUser);
        
        // send verification email
        await sendEmail({email,emailType:"VERIFY",userid:savedUser._id })

        return NextResponse.json({
            message:"User created successfully",
            success:true,
            savedUser
        })


        
        
        
    } catch (error:any) {
        return NextResponse.json({error:error.message}),
        {status:500}
        
    }
}