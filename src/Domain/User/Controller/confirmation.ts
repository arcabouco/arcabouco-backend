import { E } from "Util";
import * as UserUsecase from "Domain/User/Usecase";
import { Response } from "express";

export const confirmation = async (
  request: E.RequestBody<{ token: string; userId: string }>,
  response: Response
) => {
  const { token, userId } = request.body;

  const user = await UserUsecase.confirmation({ token, userId });

  return response.json({ user });
};
