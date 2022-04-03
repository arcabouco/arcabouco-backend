import { User } from "Domain";
import jwt from "jsonwebtoken";
import { Type } from "Util";

export const verify = <T extends Type.Json = Type.Json>(token: string) => {
  const secret = process.env.JWT_SECRET;

  try {
    const payload = jwt.verify(token, secret) as T;
    return payload;
  } catch (error) {
    return null;
  }
};
