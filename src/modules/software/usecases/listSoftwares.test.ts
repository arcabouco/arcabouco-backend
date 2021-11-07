import faker from "faker";
import { SoftwareUsecases } from ".";
import { database } from "../../../database";
import { Software } from "../../../database/entities/Software";
import { TagUseCases } from "../../tag/useCases";

let createdSoftwares: Software[] = [];

beforeAll(async () => {
  await database.init();

  const length = 3;
  const softwareCreates = Array.from({ length }, () =>
    SoftwareUsecases.createSoftware({
      description: faker.lorem.sentence(),
      name: faker.name.firstName(),
      link: faker.internet.url(),
    })
  );

  createdSoftwares = await Promise.all(softwareCreates);
});
afterAll(database.close);

describe("Softwere listSoftware useCase", () => {
  test("can list many softwares", async () => {
    const softwares = await SoftwareUsecases.listSoftwares({});

    expect(softwares.length).toBe(createdSoftwares.length);

    createdSoftwares.forEach((createdSoftware) => {
      const software = softwares.find(
        (software) => software.id === createdSoftware.id
      );

      expect(software).toMatchObject(createdSoftware);
    });
  });

  test("can list by tags", async () => {
    const category = await TagUseCases.createTagCategory({
      description: faker.lorem.sentence(),
      name: faker.name.firstName(),
      isMultiTag: false,
    });

    const softwareWithTag = createdSoftwares[0];

    const tag = await TagUseCases.createTag({
      categoryId: category.id,
      name: faker.name.firstName(),
      softwareId: softwareWithTag.id,
    });

    const softwares = await SoftwareUsecases.listSoftwares({ tags: [tag.id] });

    expect(softwares.length).toBe(1);

    expect(softwares[0]).toMatchObject(softwareWithTag);
  });
});
