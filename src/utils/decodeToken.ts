import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
const decodeToken = (token: any) => {
  if (!token) {
    return NextResponse.json({message:"No token provided"},{status:401})
  }

  const {value } = token;
  const decoded = jwt.decode(value) as JwtPayload | string;
  if (typeof decoded === "object" && decoded.hasOwnProperty("id")){
    return decoded.id;
  }
  return NextResponse.json({message:"Invalid token"},{status:401})
};

export default decodeToken;
