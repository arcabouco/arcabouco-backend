import handlebars from "handlebars";

import fs from "fs";
import path from "path";
import { pipe } from "fp-ts/function";
import * as AwsSes from "../../AwsSes";

type NewSuggestionTemplate = {
  user: {
    name: string;
    email: string;
  };
  software: {
    name: string;
  };
};

const newSuggestionTemplate = pipe(
  path.resolve(__dirname, "newSuggestionTemplate.hbs"),
  (path) => fs.readFileSync(path, "utf8").toString(),
  (templateText) => handlebars.compile<NewSuggestionTemplate>(templateText)
);

export const sendNewSuggestion = (data: NewSuggestionTemplate) => {
  const html = newSuggestionTemplate(data);
  const subject = "Nova sugestão enviada - Arcabouço";

  return AwsSes.sendEmail({ html, subject, to: [data.user.email] });
};
