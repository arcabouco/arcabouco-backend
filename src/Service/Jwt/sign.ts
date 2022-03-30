import jwt from "jsonwebtoken";
import { User } from "Domain";

export const sign = (payload: User.Type.AuthPayload) => {
  const secret = process.env.JWT_SECRET;

  const token = jwt.sign(payload, secret, { expiresIn: "1d" });
  return token;
};
