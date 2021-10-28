import { AbstractRepository, EntityRepository } from "typeorm";
import { v4 } from "uuid";
import { Tag } from "../../../database/entities/Tag";

type CreateAndSaveDTO = {
  name: string;
  categoryId: string;
  softwareId: string;
};

type GetSoftwareTagsDTO = {
  softwareId: string;
  categoryId?: string;
};

@EntityRepository(Tag)
export class TagRepository extends AbstractRepository<Tag> {
  createAndSave = async (input: CreateAndSaveDTO) => {
    const { categoryId, softwareId, name } = input;

    const entity = this.repository.create({
      tagCategoryId: categoryId,
      softwareId,
      name,
    });

    entity.id = v4();

    return await this.repository.save(entity);
  };

  findByName = async (name: string) =>
    await this.repository
      .createQueryBuilder()
      .where(`name ~* :name`, { name })
      .getOne();

  softwareTags = async ({ softwareId, categoryId }: GetSoftwareTagsDTO) =>
    this.repository.find({
      where: { softwareId, tagCategoryId: categoryId },
      relations: ["tagCategory"],
    });
}
