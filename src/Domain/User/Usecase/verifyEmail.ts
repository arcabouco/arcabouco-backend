import * as UserRepository from "Domain/User/Repository";
import { ILike } from "typeorm";

export const verifyEmail = async (input: { email: string }) => {
  const user = await UserRepository.findOne({
    where: { email: ILike(input.email) },
  });

  return { isAvailable: !user };
};
