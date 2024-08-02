import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import decodeToken from "./utils/decodeToken";

export async function middleware(req:NextRequest,res:NextResponse){
    try {
        const userId = decodeToken(cookies().get("notes_token"))

    if (!userId) {
        return NextResponse.json({message:"user not logged in"},{status:401})
    }

    } catch (error:any) {
        return NextResponse.json({message:error.message,status:500})
    }
}

export const config = {
    matcher:["/api/notes/:path*","/api/users/:path*"]
}