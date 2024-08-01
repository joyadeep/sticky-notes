import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
const generateAndSaveToken =(user:{id:string,name:string,username:string,email:string},res:NextResponse)=>{
    try {
        const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
        if (!secret) {
            return new NextResponse("no token found", { status: 404 });
        }

        const token = jwt.sign(user,secret,{expiresIn:"7d"});
        cookies().set("notes_token",token,{httpOnly:true,expires:new Date(Date.now()+1000*60*60*24*7)})

    } catch (error) {
        
    }
}

export default generateAndSaveToken;