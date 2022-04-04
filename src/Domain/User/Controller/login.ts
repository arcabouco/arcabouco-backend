import { E } from "Util";
import * as UserUsecase from "Domain/User/Usecase";
import { Response, response } from "express";
import * as Yup from "yup";

const loginBodySchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
});

type LoginBody = Yup.InferType<typeof loginBodySchema>;

export const login = async (
  request: E.RequestBody<LoginBody>,
  response: Response
) => {
  const { email, password } = loginBodySchema.validateSync(request.body);

  const { jwtToken, user } = await UserUsecase.login({ email, password });

  return response.json({ jwtToken, user });
};
