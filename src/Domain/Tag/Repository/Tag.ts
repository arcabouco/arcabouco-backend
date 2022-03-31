import {
  AbstractRepository,
  EntityRepository,
  FindOneOptions,
  getRepository,
  ILike,
} from "typeorm";
import { v4 } from "uuid";
import { Tag } from "Database/entities";

type CreateAndSaveDTO = {
  name: string;
  categoryId: string;
  softwareId: string;
};

type GetSoftwareTagsDTO = {
  softwareId: string;
  categoryId?: string;
};

export type TagMin = Omit<Tag, "softwares" | "tagCategory">;

const repository = () => getRepository(Tag);

export const createTag = async (tag: TagMin) => repository().save(tag);

export const findOneTag = (option: FindOneOptions<Tag>) =>
  repository().findOne(option);

export const findByName = async (input: {
  tagName: string;
  categoryId: string;
}): Promise<TagMin | undefined> => {
  const { categoryId, tagName } = input;

  return repository().findOne({
    where: {
      name: ILike(tagName),
      tagCategoryId: categoryId,
    },
  });
};

export const bySoftware = async ({
  softwareId,
  categoryId,
}: GetSoftwareTagsDTO): Promise<Tag[]> =>
  repository()
    .createQueryBuilder("tag")
    .leftJoinAndSelect("tag.softwares", "software")
    .leftJoinAndSelect("tag.tagCategory", "tagCategory")
    .where("software.id = :softwareId", { softwareId })
    .andWhere("tagCategory.id = :categoryId", { categoryId })
    .getMany();

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

    return this.repository.findOneOrFail({
      where: { id: createdTag.id },
      relations: ["softwares"],
    });
  };
}
