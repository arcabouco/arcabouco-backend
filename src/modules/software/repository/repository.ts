import { v4 as uuidV4 } from "uuid";

import { EntityRepository, Repository } from "typeorm";
import { Software } from "../../../entities/Software";

@EntityRepository(Software)
export class SoftwareRepository extends Repository<Software> {
  createAndSave(input: Omit<Software, "id">) {
    const { description, link, name } = input;

    const softwareEntity = new Software();
    softwareEntity.id = uuidV4();
    softwareEntity.description = description;
    softwareEntity.link = link;
    softwareEntity.name = name;

    return this.save(softwareEntity);
  }
}
