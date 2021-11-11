import { v4 } from "uuid";
import { AbstractRepository, In } from "typeorm";

import { EntityRepository, Repository } from "typeorm";
import { Software } from "../../../database/entities/Software";

type CreateAndSaveDTO = {
  name: string;
  description: string;
  link: string;
};

type fetchOne = (input: { id: string }) => Promise<Software>;

type findAll = (input: { tags?: string[] }) => Promise<Software[]>;

@EntityRepository(Software)
export class SoftwareRepository extends AbstractRepository<Software> {
  createAndSave(softwareToCreate: CreateAndSaveDTO) {
    const softwareEntity = this.repository.create(softwareToCreate);
    softwareEntity.id = v4();

    return this.repository.save(softwareEntity);
  }

  findAll: findAll = async ({ tags }) => {
    let softwareQueryBuilder = this.createQueryBuilder(
      "software"
    ).leftJoinAndSelect("software.tags", "tag");

    if (tags?.length)
      softwareQueryBuilder.where("tag.id IN (:...tags)", { tags });

    return await softwareQueryBuilder.getMany();
  };

  fetchOne: fetchOne = async ({ id }) =>
    this.repository.findOne({
      where: { id },
      relations: ["tags", "tags.tagCategory"],
    });

  async delete(input: { id: string }) {
    const { id } = input
    const softwareToDelete = await this.repository.findOne(id)

    if (!softwareToDelete) throw new Error("Software to delete not exists.")

    await this.repository.delete({ id })
    return softwareToDelete
  }
}
