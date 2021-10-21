import { v4 } from "uuid";

import { AbstractRepository, EntityRepository } from "typeorm";
import { TagCategory } from "../../../database/entities/TagCategory";
import { pipe } from "fp-ts/function";
import T from "fp-ts/Task";

type CreateAndSaveDTO = {
  name: string;
  description: string;
  isMultiTag: boolean;
};

@EntityRepository(TagCategory)
export class TagCategoryRepository extends AbstractRepository<TagCategory> {
  async createAndSave(tagCategory: CreateAndSaveDTO): Promise<TagCategory> {
    const newTagCategory = this.repository.create(tagCategory);

    newTagCategory.id = v4();

    return await this.repository.save(newTagCategory);
  }

  async findByName(name: string): Promise<TagCategory> {
    console.log({ name });

    return await this.repository
      .createQueryBuilder()
      .where(`name ~* :name`, { name })
      .getOne();
  }
}
