import { prisma, startServer, stopServer } from "@/utils/db"
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import generateAndSaveToken from "@/utils/generate.and.save.token";

export const POST = async (req:Request,res:NextResponse) =>{
    startServer();
    try {
        const {name,username,email,password,confirmPassword} = await req.json();
        if (!name || !username || !email || !password || !confirmPassword) {
            return NextResponse.json({message:"Missing fields"},{status:400});
        }

        if (password !== confirmPassword) {
            return NextResponse.json({message:"Passwords do not match"},{status:400});
        }

        const existingUser = await prisma.user.findFirst({
            where:{
                OR:[
                    {email:email},
                    {username:username}
                ]
            }
        })

        if (existingUser) {
            if (existingUser.username === username) {
                return NextResponse.json({message:"username already taken."},{status:400});
            } else {
                return NextResponse.json({message:"email already taken."},{status:400});
            }
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password,salt);

        const result =await prisma.user.create({
            data:{
                name:name,
                username:username,
                email:email,
                password:hashedPassword
            }
        })

        generateAndSaveToken({id:result?.id,name:result?.name,username:result?.username,email:result?.email},res);

        return NextResponse.json({message:"user created successfully"},{status:201});
        // TODO: add password hashing and token generation

    } catch (error) {
        
    } finally {
        stopServer();
    }
}