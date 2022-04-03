import * as UserRepository from "Domain/User/Repository";
import * as UserType from "Domain/User/Type";
import { Bcrypt, Jwt } from "Service";

export const recoverPassword = async (input: {
  userId: string;
  token: string;
  newPassword: string;
}) => {
  const user = await UserRepository.findOneOrFail({
    where: { id: input.userId },
  });

  const tokenPayload = Jwt.verify<UserType.RecoveryPayload>(input.token);

  if (!tokenPayload || !tokenPayload?.recovery)
    throw new Error("Invalid token");

  const hashedPassword = Bcrypt.hash(input.newPassword);

  UserRepository.update({ id: user.id, password: hashedPassword });
};
