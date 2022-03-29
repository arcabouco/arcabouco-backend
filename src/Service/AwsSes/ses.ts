import { SESClient } from "@aws-sdk/client-ses";

export const ses = new SESClient({
  region: "us-east-1",
});
