import { Request, Response } from "express";
import * as UserUsecase from "Domain/User/Usecase";

export const getUser = async (request: Request, response: Response) => {
  if (!request.auth?.userId) return response.status(500).end();

  const { email, id, name, lastName, role } = await UserUsecase.getUser({
    userId: request.auth.userId,
  });

  return response.json({
    user: {
      id,
      name,
      lastName,
      email,
      role,
    },
  });
};
