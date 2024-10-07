import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextResponse,NextRequest } from "next/server";
import User from "@/models/userModels"
import { connect } from "@/dbConfig/dbConfig";

connect()
export async function GET(request:NextRequest){
    try {
        const userid = await getDataFromToken(request);
         const user = await User.findOne({_id:userid}).select("-password");
         return NextResponse.json({
            message:"user found ",
            data:user
         })
        
    } catch (error:any) {
        throw NextResponse.json({error:error.message},{status:400})
        
    }

}