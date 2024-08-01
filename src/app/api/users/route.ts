import { prisma, startServer, stopServer } from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req:Request,res:NextResponse) =>{
    startServer();
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json({message:"success",data:users},{status:200})
    } catch (error) {
        return NextResponse.json({error:"Internal Server Error"},{status:500})
    } finally {
        stopServer();
    }
}