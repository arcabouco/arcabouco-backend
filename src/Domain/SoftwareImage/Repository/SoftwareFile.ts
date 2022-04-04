import { getRepository } from "typeorm";
import { SoftwareImage, SoftwareImageMin } from "Database/entities";
import { S3 } from "Service";

const repository = () => getRepository(SoftwareImage);

export const create = async (input: {
  softwareImage: SoftwareImageMin;
  data: Buffer;
}) => {
  const softwareImage = await repository().save(input.softwareImage);
  await S3.store({
    data: input.data,
    path: `software/${softwareImage.softwareId}/image/${softwareImage.id}.${softwareImage.extension}`,
  });
};
