import { prisma, startServer, stopServer } from "@/utils/db";
import {  NextResponse } from "next/server";



export const PUT = async (req:Request,{params}:{params:{id:string}}) =>{
    try {
        startServer();
        const id = params.id;
        const payload = await req.json();
        await prisma.note.update({
            where:{
                id
            },
            data:payload
        })
        return NextResponse.json({message:"success",id:id,data:payload,},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({error:"Internal Server Error"},{status:500})
    } finally{
        stopServer();
    }
}

export const DELETE = async (req:Request,{params}:{params:{id:string}}) =>{
    try {
        startServer();
        const id = params.id;
        await prisma.note.delete({
            where:{
                id
            }
        })
        return NextResponse.json({message:"success"},{status:200})
    } catch (error) {
        return NextResponse.json({error:"Internal Server Error"},{status:500})
    } finally{
        stopServer();
    }
}
