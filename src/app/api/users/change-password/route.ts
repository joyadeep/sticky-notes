import { prisma, startServer, stopServer } from "@/utils/db"
import decodeToken from "@/utils/decodeToken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const PUT = async (req:Request,res:NextResponse) =>{
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

        if (!user){
            return NextResponse.json({message:"user not found"},{status:404})
        }

        const {currentPassword,newPassword,verifyNewPassword} = await req.json();

        if (!currentPassword || !newPassword || !verifyNewPassword) {
            return NextResponse.json({message:"all fields are required"},{status:400})
        }

        if (newPassword !== verifyNewPassword) {
            return NextResponse.json({message:"passwords do not match"},{status:400})
        }

        const isPasswordMatch =  await bcrypt.compare(currentPassword,user.password);
        if (!isPasswordMatch) {
            return NextResponse.json({message:"current password is incorrect"},{status:400})
        }

        const hashedPassword = await bcrypt.hash(newPassword,10);
        await prisma.user.update({
            where:{
                id}
            ,
            data:{
                password:hashedPassword
            }
        })

        return NextResponse.json({message:"password changed successfully"},{status:200})

    } catch (error:any) {
        return NextResponse.json({message:"Internal Server Error",error:error?.message},{status:500})
        
    } finally{
        stopServer();
    }
}