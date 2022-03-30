import { E } from "Util";
import * as UserUsecase from "Domain/User/Usecase";
import { Response, response } from "express";

export const login = async (
  request: E.RequestBody<{ email: string; password: string }>,
  response: Response
) => {
  const { email, password } = request.body;

  const { jwtToken, user } = await UserUsecase.login({ email, password });

  return response.json({ jwtToken, user });
};
