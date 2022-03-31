import * as SoftwareRepository from "Domain/Software/Repository";

type DeleteSoftwareDTO = {
  id: string;
};

export const deleteSoftware = async (input: DeleteSoftwareDTO) => {
  const { id } = input;

  const deletedSoftware = await SoftwareRepository.remove({ id });
  return deletedSoftware;
};
