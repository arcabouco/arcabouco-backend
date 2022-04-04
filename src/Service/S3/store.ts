import { s3Client } from "./s3Client";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export const store = async (input: { data: Buffer; path: string }) => {
  const env = process.env.ENV || "dev";
  const bucket = `arcabouco-${env}`;

  const putObjectCommand = new PutObjectCommand({
    Bucket: bucket,
    Key: input.path,
    Body: input.data,
  });

  await s3Client.send(putObjectCommand);
};
