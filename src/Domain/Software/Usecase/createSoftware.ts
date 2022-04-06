import { Software } from "Database/entities";
import * as SoftwareRepository from "Domain/Software/Repository";
import * as SoftwareImageRepository from "Domain/SoftwareImage/Repository";
import { v4 } from "uuid";
import sizeOf from "image-size";
import { Email } from "Service";
// const fileType = require("file-type");

export const createSoftware = async (input: {
  userId: string;
  software: Omit<
    Software,
    "tags" | "user" | "createdBy" | "id" | "status" | "images"
  >;
  images?: {
    data: Buffer;
    extension: string;
    size: number;
  }[];
}): Promise<Software> => {
  const newSoftware = await SoftwareRepository.create({
    id: v4(),
    createdBy: input.userId,
    description: input.software.description,
    link: input.software.link,
    name: input.software.name,
    status: "analyzing",
    tags: [],
    images: [],
  });

  const { images = [] } = input;

  const imageCreations = images.map(async (image) => {
    const { width, height } = sizeOf(image.data);
    if (!width || !height) return null;

    return SoftwareImageRepository.create({
      data: image.data,
      softwareImage: {
        id: v4(),
        extension: image.extension,
        height,
        width,
        size: image.size,
        softwareId: newSoftware.id,
      },
    });
  });

  await Promise.all(imageCreations);

  const createdSoftware = await SoftwareRepository.findOne({
    where: { id: newSoftware.id },
  });

  Email.sendNewSuggestion({
    software: createdSoftware,
    user: createdSoftware.user,
  });

  return createdSoftware;
};
