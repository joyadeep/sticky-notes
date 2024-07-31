import { prisma, startServer, stopServer } from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req:Request,res:NextResponse) =>{
    try {
        startServer();
        const result = await prisma.note.findMany();
        return NextResponse.json({message:"success",data:result},{status:200})

    } catch (error) {
        console.log(error);
        return NextResponse.json({error:"Internal Server Error"},{status:500})
    } finally {
        stopServer();
    }
}

export const POST = async (req:Request,res:NextResponse) =>{
    try {
        startServer();
        const data = await req.json(); 
        const result = await prisma.note.create({data});

        return NextResponse.json({message:"success",data:result},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({error:"Internal Server Error"},{status:500})
    } finally {
        stopServer();
    }
}

