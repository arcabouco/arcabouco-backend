import { AbstractRepository, EntityRepository } from "typeorm";
import { v4 } from "uuid";
import { Software } from "../../../database/entities/Software";
import { Tag } from "../../../database/entities/Tag";
import { TagCategory } from "../../../database/entities/TagCategory";

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
      softwares: [{ id: softwareId }],
      name,
    });

    entity.id = v4();

    const createdTag = await this.repository.save(entity);

    return this.repository.findOne({
      where: { id: createdTag.id },
      relations: ["softwares"],
    });
  };

  findByName = async (name: string) =>
    await this.repository
      .createQueryBuilder()
      .where(`name ~* :name`, { name })
      .getOne();

  softwareTags = async ({
    softwareId,
    categoryId,
  }: GetSoftwareTagsDTO): Promise<Tag[]> =>
    this.repository
      .createQueryBuilder("tag")
      .leftJoinAndSelect("tag.softwares", "software")
      .leftJoinAndSelect("tag.tagCategory", "tagCategory")
      .where("software.id = :softwareId", { softwareId })
      .andWhere("tagCategory.id = :categoryId", { categoryId })
      .getMany();
}
