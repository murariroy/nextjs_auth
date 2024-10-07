"use client";
import axios from "axios";
import Link from "next/link";
import React ,{useState} from "react";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import toast from "react-hot-toast";

export default function ProfilePage(){
    const router = useRouter()
    const [data,setData] = useState("nothing")

    const logout =  async () =>{
        try {
          await  axios.get('/api/users/logout')
          toast.success("logout successfull")
          router.push("/login")
            
        } catch (error:any) {
            console.log(error.message);

            toast.error(error.message)
            
            
        }

    }
     const getUserDetaisl = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData (res.data.data._id)
        

     } 
     
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2 className="p-3 rounded bg-green-500 ">{data === "nothin" ?  "nothin" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
           <button
           onClick={logout}
           className="bg-blue-500 hover:bg-blue-700 text-white mt-4"
           >Logout</button>

           <button

           onClick={getUserDetaisl}
           className="bg-purple-900 hover:bg-blue-700 text-white mt-4"
           >get user details</button>
        </div>
    )
}