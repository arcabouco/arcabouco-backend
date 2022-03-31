import { getCustomRepository, ILike } from "typeorm";
import { Software, Tag, TagCategory } from "Database/entities";
import * as SoftwareRepository from "Domain/Software/Repository";
import * as TagRepository from "Domain/Tag/Repository";
import { v4 } from "uuid";
import { TagCategoryRepository } from "Domain/Tag/Repository";
import * as R from "ramda";
import { pipe } from "fp-ts/lib/function";
import { P } from "Util";

type CreateSoftwareDTO = {
  software: {
    name: string;
    description: string;
    link: string;
  };
  user: {
    id: string;
  };
  categories: {
    name: string;
    tags: string[];
  }[];
};

export const createSoftware = async (
  input: CreateSoftwareDTO
): Promise<Software> => {
  const software = await SoftwareRepository.create({
    id: v4(),
    createdBy: input.user.id,
    name: input.software.name,
    description: input.software.description,
    link: input.software.link,
    status: "analyzing",
    tags: [],
  });

  const createdSoftware = await pipe(
    input.categories.map(createCategoryIfNotExist),
    P.all,
    P.then(
      R.map((tagCategory) =>
        tagCategory.tags.map((tagName) =>
          createTagsIfNotExist({ tagName, tagCategory })
        )
      )
    ),
    P.then(R.flatten),
    P.then(P.all),
    P.then((tags) =>
      SoftwareRepository.addTags({ softwareId: software.id, tags })
    ),
    P.then(({ id }) => SoftwareRepository.findOne({ id }))
  );

  return createdSoftware;
};

const createCategoryIfNotExist = async (category: {
  name: string;
  tags: string[];
}): Promise<Omit<TagCategory, "tags"> & { tags: string[] }> => {
  const existingCategory = await TagRepository.findOneCategory({
    where: { name: ILike(category.name) },
  });

  if (existingCategory) return { ...existingCategory, tags: category.tags };

  const newCategory = await TagRepository.createCategory({
    id: v4(),
    isMultiTag: true,
    name: category.name,
  });

  return { ...newCategory, tags: category.tags };
};

const createTagsIfNotExist = async (input: {
  tagName: string;
  tagCategory: Omit<TagCategory, "tags">;
}): Promise<Tag> => {
  const existingTag = await TagRepository.findOneTag({
    where: { name: ILike(input.tagName), tagCategoryId: input.tagCategory.id },
  });

  if (existingTag) return existingTag;

  return TagRepository.createTag({
    id: v4(),
    name: input.tagName,
    tagCategoryId: input.tagCategory.id,
  });
};
