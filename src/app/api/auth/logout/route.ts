import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async(req:Request,res:NextResponse) =>{
    try {
        cookies().delete("notes_token");
        return NextResponse.json({message:"user logged out successfully"},{status:200})
    } catch (error) {
        return NextResponse.json({message:error,status:500})
    }
}