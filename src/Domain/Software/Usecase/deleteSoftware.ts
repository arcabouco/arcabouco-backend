import { getCustomRepository } from "typeorm";
import { SoftwareRepository } from "Domain/Software/Repository";

type DeleteSoftwareDTO = {
  id: string;
};

export const deleteSoftware = async (input: DeleteSoftwareDTO) => {
  const softwareRepository = getCustomRepository(SoftwareRepository);

  const { id } = input;

  const deletedSoftware = await softwareRepository.delete({ id });
  return deletedSoftware;
};
