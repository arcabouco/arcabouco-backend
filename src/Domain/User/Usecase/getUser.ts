import * as User from "Domain/User/Repository";

export const getUser = async (input: { userId: string }) => {
  const user = await User.findOneOrFail({ where: { id: input.userId } });

  return user;
};
