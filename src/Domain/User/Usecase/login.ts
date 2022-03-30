import { string } from "fp-ts";
import * as UserRepository from "Domain/User/Repository";

const login = (input: { email: string; password: string }) => {
  const { email, password } = input;

  const user = UserRepository.findOne({ where: { email } });
};
