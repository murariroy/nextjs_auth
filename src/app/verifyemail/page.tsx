"user client";
import axios  from "axios";
import Link from "next/link";
import React,{useEffect,useState} from "react";


export default  function VerifyEmailPage(){
    const [token ,setToken] = useState(false);
    const [error,seterror] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/usersw/verifyemail',{token})
            setVerified(true);

            
        } catch (error:any) {

            seterror(true);
            console.log(error.response.data);
            
            
        }
    }

    useEffect(() =>{
        const urlToken = window.location.search.split('=')
        [1];
        setToken(urlToken )

    },[])


    useEffect(() =>{
        if(token.length > 0){
            verifyUserEmail();
        }
    },[token]);

    return (
        <div className=" flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className=" text-4xl "> Verify Email</h1>
            <h1 className=" p-2 bg-red-600 text-black">{token ? `${token}` : "no token"}</h1>



            {verified&& (
                <div>
                  <h2 className="text-2xl ">email verified</h2>
                  <Link href='/login'>
                      <a className="text-blue-500">Login</a>

                  </Link>

                </div>
            )}

            {error && (
                <div>
                   <h2 className="text-2xl bg-red-600 text-black">Error</h2>

                </div>
            )}


        </div>
    )
}