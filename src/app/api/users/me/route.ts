import { prisma, startServer, stopServer } from "@/utils/db"
import decodeToken from "@/utils/decodeToken"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const GET = async(req:Request,res:NextResponse)=>{
    startServer();
    try {
        const token = cookies().get("notes_token");
        if (!token) {
            return NextResponse.json({message:"user not logged in"},{status:401})
        }
        const id = decodeToken(token);

        const user = await prisma.user.findFirst({
            where:{
                id
            }
        })

        if (!user) {
            return NextResponse.json({message:"user not found"},{status:404})
        }
        const {password,...rest} = user
        return NextResponse.json(rest)

    } catch (error) {
        return NextResponse.json({message:error},{status:500})
    } finally{
        stopServer();
    }
}