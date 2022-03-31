import { v4 } from "uuid";

import {
  AbstractRepository,
  EntityRepository,
  FindConditions,
  FindOneOptions,
  getRepository,
  ILike,
} from "typeorm";
import { TagCategory } from "Database/entities";
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

export const findCategoryByName = (
  name: string
): Promise<TagCategoryMin | undefined> => {
  return repository().findOne({ where: { name: ILike(name) } });
};

export const findOneCategory = (option: FindOneOptions<TagCategory>) =>
  repository().findOne(option);

export const findCategory = (
  option: FindOneOptions<TagCategory>
): Promise<TagCategoryMin> => {
  const relations = pipe([...(option.relations || []), "tags"], R.uniq);

  return repository().findOneOrFail({ ...option, relations });
};

@EntityRepository(TagCategory)
export class TagCategoryRepository extends AbstractRepository<TagCategory> {
  async createAndSave(tagCategory: CreateAndSaveDTO): Promise<TagCategory> {
    const newTagCategory = this.repository.create(tagCategory);

    newTagCategory.id = v4();

    return await this.repository.save(newTagCategory);
  }

  fetchByName = async (name: string): Promise<TagCategory> =>
    await this.repository
      .createQueryBuilder()
      .where(`name ~* :name`, { name })
      .getOneOrFail();

  fetchAll: findAll = async (findConditions) =>
    this.repository.find({
      where: findConditions,
    });
}
