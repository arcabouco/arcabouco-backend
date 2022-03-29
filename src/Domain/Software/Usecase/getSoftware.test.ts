import faker from "faker";

import * as SoftwareUsecase from "Domain/Software/Usecase";
import { Connection } from "Database";
import * as TagUseCase from "Domain/Tag/Usecase";

import R from "ramda";

beforeAll(Connection.init);
afterAll(Connection.close);

describe("Software getSoftware useCase", () => {
  test("can get a software", async () => {
    const createdSoftware = await SoftwareUsecase.createSoftware({
      description: faker.lorem.sentence(),
      link: faker.internet.url(),
      name: faker.lorem.word(),
    });

    const software = await SoftwareUsecase.getSoftware({
      softwareId: createdSoftware.id,
    });

    expect(software).toMatchObject(createdSoftware);
  });

  test("can get a software with tag and tagCategory", async () => {
    const createdSoftware = await SoftwareUsecase.createSoftware({
      description: faker.lorem.sentence(),
      link: faker.internet.url(),
      name: faker.lorem.word(),
    });

    const tagCategory = await TagUseCase.createTagCategory({
      description: faker.lorem.sentence(),
      isMultiTag: false,
      name: faker.lorem.word(),
    });

    const tag = R.omit(
      ["softwares"],
      await TagUseCase.createTag({
        categoryId: tagCategory.id,
        name: faker.lorem.word(),
        softwareId: createdSoftware.id,
      })
    );

    const software = await SoftwareUsecase.getSoftware({
      softwareId: createdSoftware.id,
    });

    expect(software).toMatchObject(createdSoftware);

    expect(software.tags).toHaveLength(1);
    expect(software.tags[0]).toEqual({ ...tag, tagCategory });

    expect(software.tags[0].tagCategory).toEqual(tagCategory);
  });
});
