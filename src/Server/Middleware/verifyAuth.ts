import { RequestHandler } from "express";
import { pipe } from "fp-ts/lib/function";
import * as R from "ramda";
import { Jwt } from "Service";
import * as UserRepository from "Domain/User/Repository";
import { IsNull } from "typeorm";
import { User } from "Domain";
import * as yup from "yup";

export const verifyAuth: RequestHandler = async (request, response, next) => {
  const authPayload = pipe(
    request.headers.authorization || "",
    R.replace(/^Bearer\s+/i, ""),
    (token) => Jwt.verify<User.Type.AuthPayload>(token)
  );

  const isValidAuthPayload = yup
    .object({
      email: yup.string().required(),
      userId: yup.string().required(),
      role: yup.string().required(),
    })
    .isValidSync(authPayload);

  if (!isValidAuthPayload) return next();

  const user = await UserRepository.findOneOrFail({
    where: { id: authPayload?.userId || "", signupToken: IsNull() },
  });

  request.auth = {
    email: user.email,
    userId: user.id,
    role: user.role,
  };

  next();
};
