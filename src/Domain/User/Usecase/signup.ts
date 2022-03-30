import { User } from "Database/entities";
import { Bcrypt, Email } from "Service";
import { v4 } from "uuid";
import crypto from "crypto";
import * as UserRepository from "Domain/User/Repository";
import { pipe } from "fp-ts/function";
import * as R from "ramda";
import { P } from "Util";
import { ILike } from "typeorm";
import queryString from "query-string";

export const signup = async (inputUser: User) => {
  const STRING_LENGTH_TO_BYTES = 2;
  const tokenLength = 18;

  const signupToken = crypto
    .randomBytes(tokenLength / STRING_LENGTH_TO_BYTES)
    .toString("hex");

  const userAlreadyExists = await UserRepository.findOne({
    where: { email: ILike(inputUser.email) },
  });

  if (userAlreadyExists) throw new Error("User already exists");

  const newUser: User = {
    id: v4(),
    name: inputUser.name.trim(),
    lastName: inputUser.lastName.trim(),
    email: inputUser.email.toLowerCase(),
    password: Bcrypt.hash(inputUser.password),
    signupToken: Bcrypt.hash(signupToken),
    recoveryToken: null,
    role: "USER",
  };

  const confirmatilUrlParam = queryString.stringify({
    token: signupToken,
    id: newUser.id,
  });

  const confirmationUrl = `https://arcabouco.org/app/confirm?${confirmatilUrlParam}`;

  return pipe(
    newUser,
    UserRepository.create,
    P.thenNotAwait(() => Email.signupSend({ confirmationUrl, user: newUser }))
  );
};
