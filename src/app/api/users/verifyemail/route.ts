import {connect} from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModels";
export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token);

        User .findOne({verifyToken:token,verifyExpiryToken:{$gt:Date.now()
        }});


        if(!user){
            return NextResponse.json({error:"invalid token"},{status:400})

        }
        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined,
        user.verifyExpiryToken = undefined,
        await user.save()

        return NextResponse.json({
            message:"Email verify Successfully",
            success:true,
        })
        
        
    } catch (error) {
        return NextResponse.join({error:error.message},
            {status:500}
        )
        
    }
}