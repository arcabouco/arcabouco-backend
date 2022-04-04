import { s3Client } from "./s3Client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const getUrl = async (path: string) => {
  const env = process.env.ENV || "dev";
  const bucket = `arcabouco-${env}`;

  const getObjectCommand = new GetObjectCommand({
    Bucket: bucket,
    Key: path,
  });

  const url = await getSignedUrl(s3Client, getObjectCommand, {
    expiresIn: 30 * 60,
  });

  return url;
};
