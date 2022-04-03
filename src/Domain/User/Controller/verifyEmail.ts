import { Request, Response } from "express";
import * as UserUsecase from "Domain/User/Usecase";

export const verifyEmail = async (
  request: Request<{ email: string }>,
  response: Response
) => {
  const { email } = request.params;

  const { isAvailable } = await UserUsecase.verifyEmail({ email });

  return response.json({ isAvailable });
};
