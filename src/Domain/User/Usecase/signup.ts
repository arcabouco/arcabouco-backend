import { User } from "Database/entities";
import { Bcrypt, Email } from "Service";
import { v4 } from "uuid";
import crypto from "crypto";
import * as UserRepository from "Domain/User/Repository";
import { pipe } from "fp-ts/function";
import * as R from "ramda";
import { P } from "Util";

export const signup = async (inputUser: User) => {
  const STRING_LENGTH_TO_BYTES = 2;
  const tokenLength = 16;

  const signupToken = crypto
    .randomBytes(tokenLength / STRING_LENGTH_TO_BYTES)
    .toString("hex");

  const confirmationUrl = `https://arcabouco.org/app/confirm/${signupToken}`;

  const userAlreadyExists = await UserRepository.findOne({
    where: { email: inputUser.email },
  });

  if (userAlreadyExists) throw new Error("User already exists");

  const newUser: User = {
    ...inputUser,
    id: v4(),
    password: Bcrypt.hash(inputUser.password),
    signupToken: Bcrypt.hash(signupToken),
    recoveryToken: null,
    role: "USER",
  };

  return pipe(
    newUser,
    UserRepository.create,
    (user) => Email.signupSend({ confirmationUrl, user: newUser }),
    () => newUser
  );
};
