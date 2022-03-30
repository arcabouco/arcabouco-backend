import { User } from "Domain";
import jwt from "jsonwebtoken";

export const verify = (token: string) => {
  const secret = process.env.JWT_SECRET;

  try {
    const payload = jwt.verify(token, secret) as User.Type.AuthPayload;
    return payload;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
