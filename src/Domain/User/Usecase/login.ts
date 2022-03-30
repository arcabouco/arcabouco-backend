import { string } from "fp-ts";
import * as UserRepository from "Domain/User/Repository";
import { Bcrypt, Jwt } from "Service";
import { IsNull } from "typeorm";

export const login = async (input: { email: string; password: string }) => {
  const { email, password } = input;

  const user = await UserRepository.findOneOrFail({
    where: { email, signupToken: IsNull() },
  });

  const isValidPassword = Bcrypt.compare({
    hash: user.password,
    plainText: password,
  });

  if (!isValidPassword) throw new Error("Invalid password");

  const jwtToken = Jwt.sign({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  return { jwtToken, user };
};
