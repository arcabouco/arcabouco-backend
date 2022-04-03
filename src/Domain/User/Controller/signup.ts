import { User } from "Database/entities";
import { Response } from "express";
import { E } from "Util";
import * as UserUsecase from "Domain/User/Usecase";
import * as Yup from "yup";

type SignupBody = {
  email: string;
  password: string;
  name: string;
  lastName: string;
};

const bodySchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
  name: Yup.string().required(),
  lastName: Yup.string().required(),
});

export const signup = async (
  request: E.RequestBody<SignupBody>,
  response: Response
) => {
  const userData = bodySchema.validateSync(request.body);

  const newUser = await UserUsecase.signup(userData);

  return response.json({ user: newUser });
};
