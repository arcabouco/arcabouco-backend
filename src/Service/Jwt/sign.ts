import jwt from "jsonwebtoken";
import { User } from "Domain";
import { Type } from "Util";

export const sign = <T extends Type.Json = Type.Json>(
  payload: T,
  expiresIn = "1d"
) => {
  const secret = process.env.JWT_SECRET;

  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};
