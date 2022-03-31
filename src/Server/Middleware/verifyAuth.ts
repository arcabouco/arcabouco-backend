import { RequestHandler } from "express";
import { pipe } from "fp-ts/lib/function";
import * as R from "ramda";
import { Jwt } from "Service";
import * as UserRepository from "Domain/User/Repository";
import { IsNull } from "typeorm";

export const verifyAuth: RequestHandler = async (request, response, next) => {
  const authPayload = pipe(
    request.headers.authorization || "",
    R.replace(/^Bearer\s+/i, ""),
    Jwt.verify
  );

  if (!authPayload) return next();

  const user = await UserRepository.findOneOrFail({
    where: { id: authPayload.userId, signupToken: IsNull() },
  });

  request.auth = {
    email: user.email,
    userId: user.id,
    role: user.role,
  };

  next();
};
