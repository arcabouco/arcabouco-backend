import faker from "faker";
import * as SoftwareUsecase from "Domain/Software/Usecase";
import { Connection } from "Database/";
import { Software } from "Database/entities";
import * as TagUsecase from "Domain/Tag/Usecase";

let createdSoftwares: Software[] = [];

beforeAll(async () => {
  await Connection.init();

  const length = 3;
  const softwareCreates = Array.from({ length }, () =>
    SoftwareUsecase.createSoftware({
      description: faker.lorem.sentence(),
      name: faker.name.firstName(),
      link: faker.internet.url(),
    })
  );

  createdSoftwares = await Promise.all(softwareCreates);
});
afterAll(Connection.close);

describe("Softwere listSoftware useCase", () => {
  test("can list many softwares", async () => {
    const softwares = await SoftwareUsecase.listSoftwares({});

    expect(softwares.length).toBe(createdSoftwares.length);

    createdSoftwares.forEach((createdSoftware) => {
      const software = softwares.find(
        (software) => software.id === createdSoftware.id
      );

      expect(software).toMatchObject(createdSoftware);
    });
  });

  test("can list by tags", async () => {
    const category = await TagUsecase.createTagCategory({
      description: faker.lorem.sentence(),
      name: faker.name.firstName(),
      isMultiTag: false,
    });

    const softwareWithTag = createdSoftwares[0];

    const tag = await TagUsecase.createTag({
      categoryId: category.id,
      name: faker.name.firstName(),
      softwareId: softwareWithTag.id,
    });

    const softwares = await SoftwareUsecase.listSoftwares({ tags: [tag.id] });

    expect(softwares.length).toBe(1);

    expect(softwares[0]).toMatchObject(softwareWithTag);
  });
});
