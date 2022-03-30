import * as UserRepository from "Domain/User/Repository";
import { Bcrypt } from "Service";

export const confirmation = async (input: {
  userId: string;
  token: string;
}) => {
  const { userId, token } = input;

  const user = await UserRepository.findOneOrFail({ where: { id: userId } });

  const isValidToken = Bcrypt.compare({
    hash: user.signupToken || "",
    plainText: token,
  });

  if (!isValidToken) throw new Error("Invalid token");

  const updatedUser = await UserRepository.update({
    ...user,
    signupToken: null,
  });

  return updatedUser;
};
