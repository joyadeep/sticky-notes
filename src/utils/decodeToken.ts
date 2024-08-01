import jwt, { JwtPayload } from "jsonwebtoken";
const decodeToken = (token: any) => {
  if (!token) {
    throw new Error("No token provided");
  }

  const {value } = token;
  const decoded = jwt.decode(value) as JwtPayload | string;
  if (typeof decoded === "object" && decoded.hasOwnProperty("id")){
    return decoded.id;
  }
  throw new Error("Invalid token");
};

export default decodeToken;
