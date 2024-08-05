import { prisma, startServer, stopServer } from "@/utils/db";
import decodeToken from "@/utils/decodeToken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (req:Request,res:NextResponse) =>{
    try {
        startServer();
        const userId = decodeToken(cookies().get("notes_token"));
        const result = await prisma.note.findMany({
            where:{
                userId
            }
        });
        return NextResponse.json({message:"success",data:result},{status:200})

    } catch (error:any) {
        console.log(error);
        return NextResponse.json({error:"Internal Server Error",data:error.message},{status:500})
    } finally {
        stopServer();
    }
}

export const POST = async (req:Request,res:NextResponse) =>{
    try {
        startServer();
        const data = await req.json(); 
        const userID = decodeToken(cookies().get("notes_token"));
        data.user = { connect : {
            id: userID
        }}

        console.log("data",data);
        const result = await prisma.note.create(
            {
                data
            }
        );

        return NextResponse.json({message:"success",data:result},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({error:"Internal Server Error"},{status:500})
    } finally {
        stopServer();
    }
}

