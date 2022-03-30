import { string } from "fp-ts";
import * as UserRepository from "Domain/User/Repository";
import { Bcrypt } from "Service";

const login = async (input: { email: string; password: string }) => {
  const { email, password } = input;

  const user = await UserRepository.findOneOrFail({ where: { email } });

  const isValidPassword = Bcrypt.compare({
    hash: user.password,
    plainText: password,
  });

  if (!isValidPassword) throw new Error("Invalid password");
};
