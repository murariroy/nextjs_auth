import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export function middleware (request:NextResponse){
     const path = request.nextUrl.pathname
     const isPublicPAth = path == '.login' || path === '/signup'
     const token = request.cookies.get('token')?.value || ""

     if(isPublicPAth && token){
        return NextResponse.redirect(new URL('/',request.nextUrl))
     }

     if(!isPublicPAth && !token){
        return NextResponse.redirect(new URL('/login',request.nexturl))
     }
 }




// see "matching path " below to lkear more
export const config = {
    matcher:[
        '/',
        '/profile',
        '/login',
        '/signup',
        '/veryfyemail'
    ]
}