import { FindCondition, FindOneOptions, getRepository } from "typeorm";

import { Software, SoftwareMin, Tag, TagMin, User } from "Database/entities";

import * as R from "ramda";
import { pipe } from "fp-ts/lib/function";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

type findAll = (input: { tags?: string[] }) => Promise<Software[]>;

const repository = () => getRepository(Software);

export const create = (software: Omit<Software, "user">) =>
  repository().save(software);

export const addTags = async (input: {
  softwareId: string;
  tags: TagMin[];
}): Promise<SoftwareMin> => {
  const software = await repository().findOneOrFail({
    where: { id: input.softwareId },
    relations: ["tags"],
  });

  const newTags = input.tags.map((tag) => {
    const tagEntity = new Tag();
    tagEntity.name = tag.name;
    tagEntity.id = tag.id;
    return tagEntity;
  });

  software.tags = pipe([...newTags, ...software.tags], R.uniqBy(R.prop("id")));

  return repository().save(software);
};

export const findAll = async (input?: {
  tags?: string[];
}): Promise<
  (Software & {
    tags: Omit<Tag, "softwares" | "tagCategory">[];
  })[]
> => {
  const { tags } = input || {};

  let builder = repository()
    .createQueryBuilder("software")
    .leftJoinAndSelect("software.user", "user")
    .leftJoinAndSelect("software.tags", "tag")
    .leftJoinAndSelect("software.images", "image");

  if (tags?.length) builder.where("tag.id IN (:...tags)", { tags });

  return builder.getMany();
};

export const findOne = async (
  option: FindOneOptions<Software>
): Promise<Software> => {
  const relations = pipe(
    [...(option.relations || []), "user", "images"],
    R.uniq
  );
  const software = await repository().findOneOrFail({ ...option, relations });

  return software;
};

export const remove = async (condition: FindCondition<Software>) => {
  const softwareToDelete = await repository().findOne({ ...condition });

  if (!softwareToDelete) throw new Error("Software to delete not exists.");

  await repository().delete({ ...condition });
  return softwareToDelete;
};

export const update = async (software: Partial<SoftwareMin>) => {
  await repository().update({ id: software.id }, software);

  const updatedSoftware = await repository().findOneOrFail(software.id, {
    relations: ["user"],
  });

  return updatedSoftware;
};
