import { prisma, startServer, stopServer } from "@/utils/db"
import generateAndSaveToken from "@/utils/generate.and.save.token";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req:Request,res:NextResponse) =>{
    startServer();
    try {
        const {input,password} = await req.json();
        if (!input || !password) {
            return NextResponse.json({message:"Missing fields"},{status:400})
        }
        const user = await prisma.user.findFirst({
            where:{
                OR:[
                    {email:input},
                    {username:input}
                ]
            }
        })

        if (!user) {
            return NextResponse.json({message:"Invalid credentials"},{status:404})// TODO : change this message in production
        }

        const isPasswordMatch = bcrypt.compareSync(password,user?.password);
        if (!isPasswordMatch) {
            return NextResponse.json({message:"invalid credentials"},{status:401})
        }

        const {password:userPassword,...rest} = user;

        generateAndSaveToken({id:user?.id,name:user?.name,username:user?.username,email:user?.email},res);

        return NextResponse.json({message:"success",data:rest},{status:200})

    } catch (error) {
        return NextResponse.json({error:"Internal Server Error"},{status:500})
    } finally {
        stopServer();
    }
}