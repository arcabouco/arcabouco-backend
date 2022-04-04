import { SoftwareMin } from "Database/entities";
import * as SoftwarePermission from "Domain/Software/Permission";
import * as SoftwareRepository from "Domain/Software/Repository";

export const editSoftware = async (input: {
  softwareUpdates: {
    id: string;
    description: string;
    name: string;
    link: string;
  };
  actorId: string;
  actorRole: string;
}) => {
  const software = await SoftwareRepository.findOne({
    where: { id: input.softwareUpdates.id },
  });

  const canEditSoftware = SoftwarePermission.toEdit({
    actorId: input.actorId,
    actorRole: input.actorRole,
    software,
  });

  if (!canEditSoftware) throw new Error("Not authorized");

  const updatedSoftware = await SoftwareRepository.update({
    name: input.softwareUpdates.name,
    description: input.softwareUpdates.description,
    id: input.softwareUpdates.id,
    link: input.softwareUpdates.link,
  });

  return updatedSoftware;
};
