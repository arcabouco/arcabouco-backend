import { SendEmailCommand } from "@aws-sdk/client-ses";
import { ses } from "./ses";

export const sendEmail = async (input: {
  html: string;
  subject: string;
  to: string[];
  cc?: string[];
}) => {
  const { html, to, cc, subject } = input;

  const sendEmailCommand = new SendEmailCommand({
    Destination: {
      ToAddresses: to,
      CcAddresses: cc,
    },
    Message: {
      Body: {
        Html: { Data: html, Charset: "UTF-8" },
      },
      Subject: { Data: subject, Charset: "UTF-8" },
    },

    Source: "arcabouco@arcabouco.org",
    ReplyToAddresses: ["not-reply@arcabouco.org"],
  });

  return ses.send(sendEmailCommand);
};
