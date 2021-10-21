import { v4 } from "uuid";
import { AbstractRepository, Like } from "typeorm";

import { EntityRepository, Repository } from "typeorm";
import { Software } from "../../../database/entities/Software";

type CreateAndSaveDTO = {
  name: string;
  description: string;
  link: string;
};

@EntityRepository(Software)
export class SoftwareRepository extends AbstractRepository<Software> {
  createAndSave(softwareToCreate: CreateAndSaveDTO) {
    const softwareEntity = this.repository.create(softwareToCreate);
    softwareEntity.id = v4();

    return this.repository.save(softwareEntity);
  }
}
