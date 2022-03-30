import { User } from "Database/entities";
import { Response } from "express";
import { E } from "Util";
import * as UserUsecase from "Domain/User/Usecase";

export const signup = async (
  request: E.RequestBody<User>,
  response: Response
) => {
  const newUser = await UserUsecase.signup(request.body);

  return response.json(newUser);
};
