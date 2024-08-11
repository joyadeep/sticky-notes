import { prisma, startServer, stopServer } from "@/utils/db";
import decodeToken from "@/utils/decodeToken";
import { cookies } from "next/headers";
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

export const DELETE = async (req:Request,res:NextResponse) =>{
    startServer();
    try {
        const token = cookies().get("notes_token");
        if (!token) {
            return NextResponse.json({message:"user not logged in"},{status:401})
        }
        const id = decodeToken(token);

        await prisma.$transaction([
            prisma.note.deleteMany({
                where:{
                    userId:id
                }
            }),
            prisma.user.delete({
                where:{
                    id
                }
            })
        ])
        return NextResponse.json({message:"success"},{status:200})
    } catch (error) {
        return NextResponse.json({error:"Internal Server Error"},{status:500})
    } finally {
        stopServer();
    }
}