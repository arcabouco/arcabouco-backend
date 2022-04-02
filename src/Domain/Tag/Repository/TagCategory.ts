import { v4 } from "uuid";

import {
  AbstractRepository,
  EntityRepository,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  getRepository,
  ILike,
} from "typeorm";
import { SoftwareMin, TagCategory } from "Database/entities";
import { Tag } from "Domain";
import { pipe } from "fp-ts/lib/function";
import * as R from "ramda";

type CreateAndSaveDTO = {
  name: string;
  description: string;
  isMultiTag: boolean;
};

type findAll = (
  findConditions: FindConditions<TagCategory> | FindConditions<TagCategory>[]
) => Promise<TagCategory[]>;

type TagCategoryMin = Omit<TagCategory, "tags">;

const repository = () => getRepository(TagCategory);

export const createCategory = async (
  tagCategory: Omit<TagCategory, "tags">
) => {
  const newCategory = repository().save(tagCategory);

  return newCategory;
};

type findCategoryByName = (name: string) => Promise<TagCategoryMin | undefined>;

export const findCategoryByName: findCategoryByName = (name) => {
  return repository().findOne({ where: { name: ILike(name) } });
};

export const findOneCategory = (option: FindOneOptions<TagCategory>) =>
  repository().findOne(option);

export const findCategory = (
  option: FindManyOptions<TagCategory>
): Promise<TagCategoryMin[]> => {
  const relations = pipe([...(option.relations || []), "tags"], R.uniq);

  return repository().find({ ...option, relations });
};

type findBySoftware = (
  softwareCondition: Partial<SoftwareMin>
) => Promise<TagCategory[]>;

export const findCategoryBySoftware: findBySoftware = (softwareCondition) => {
  const query = repository()
    .createQueryBuilder("category")
    .leftJoinAndSelect("category.tags", "tag")
    .leftJoin("tag.softwares", "software");

  Object.entries(softwareCondition).forEach(([key, value]) => {
    query.andWhere(`software.${key} = :${key}`, { [key]: value });
  });

  return query.getMany();
};
