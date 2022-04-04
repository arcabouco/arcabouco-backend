import { User } from "Database/entities";
import { Response } from "express";
import { E } from "Util";
import * as UserUsecase from "Domain/User/Usecase";
import * as Yup from "yup";

const bodySchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
  name: Yup.string().required(),
  lastName: Yup.string().required(),
});

type SignupBody = Yup.InferType<typeof bodySchema>;

export const signup = async (
  request: E.RequestBody<SignupBody>,
  response: Response
) => {
  const userData = bodySchema.validateSync(request.body);

  const newUser = await UserUsecase.signup(userData);

  return response.json({ user: newUser });
};
