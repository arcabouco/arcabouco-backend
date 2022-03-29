import handlebars from "handlebars";

import fs from "fs";
import path from "path";
import { pipe } from "fp-ts/function";
import * as AwsSes from "../../AwsSes";

type SignupTemplate = {
  user: {
    name: string;
  };
};

const signupTemplate = pipe(
  path.resolve(__dirname, "signupTemplate.hbs"),
  (path) => fs.readFileSync(path, "utf8").toString(),
  (templateText) => handlebars.compile<SignupTemplate>(templateText)
);

export const signupSend = (data: SignupTemplate) => (to: string) => {
  const html = signupTemplate(data);
  const subject = "Signing Request";

  return AwsSes.sendEmail({ html, subject, to: [to] });
};

signupSend({ user: { name: "jon" } })("ae");
