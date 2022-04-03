import handlebars from "handlebars";

import fs from "fs";
import path from "path";
import { pipe } from "fp-ts/function";
import * as AwsSes from "../../AwsSes";

type SignupTemplate = {
  user: {
    name: string;
    email: string;
  };
  confirmationUrl: string;
};

const signupTemplate = pipe(
  path.resolve(__dirname, "signupTemplate.hbs"),
  (path) => fs.readFileSync(path, "utf8").toString(),
  (templateText) => handlebars.compile<SignupTemplate>(templateText)
);

export const signupSend = (data: SignupTemplate) => {
  const html = signupTemplate(data);
  const subject = "Confirmação de cadastro - Arcabouço";

  return AwsSes.sendEmail({ html, subject, to: [data.user.email] });
};
