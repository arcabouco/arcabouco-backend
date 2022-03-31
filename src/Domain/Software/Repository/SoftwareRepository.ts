import { FindCondition, getRepository } from "typeorm";

import { Software } from "Database/entities";

type findAll = (input: { tags?: string[] }) => Promise<Software[]>;

const repository = () => getRepository(Software);

export const create = (software: Omit<Software, "user">) =>
  repository().create(software);

export const findAll = async (input?: { tags?: string[] }) => {
  const { tags } = input || {};

  let builder = repository()
    .createQueryBuilder("software")
    .leftJoinAndSelect("software.tags", "tag");

  if (tags?.length) builder.where("tag.id IN (:...tags)", { tags });

  return await builder.getMany();
};

export const findOne = async (where: FindCondition<Software>) =>
  repository().findOneOrFail({
    where,
    relations: ["tags", "tags.tagCategory"],
  });

export const remove = async (condition: FindCondition<Software>) => {
  const softwareToDelete = await repository().findOne({ ...condition });

  if (!softwareToDelete) throw new Error("Software to delete not exists.");

  await repository().delete({ ...condition });
  return softwareToDelete;
};
