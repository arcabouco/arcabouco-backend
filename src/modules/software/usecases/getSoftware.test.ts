import faker from "faker";

import { SoftwareUsecases } from ".";
import { database } from "../../../database";
import { TagUseCases } from "../../tag/useCases";

import R from "ramda";

beforeAll(database.init);
afterAll(database.close);

describe("Software getSoftware useCase", () => {
  test("can get a software", async () => {
    const createdSoftware = await SoftwareUsecases.createSoftware({
      description: faker.lorem.sentence(),
      link: faker.internet.url(),
      name: faker.lorem.word(),
    });

    const software = await SoftwareUsecases.getSoftware({
      softwareId: createdSoftware.id,
    });

    expect(software).toMatchObject(createdSoftware);
  });

  test("can get a software with tag and tagCategory", async () => {
    const createdSoftware = await SoftwareUsecases.createSoftware({
      description: faker.lorem.sentence(),
      link: faker.internet.url(),
      name: faker.lorem.word(),
    });

    const tagCategory = await TagUseCases.createTagCategory({
      description: faker.lorem.sentence(),
      isMultiTag: false,
      name: faker.lorem.word(),
    });

    const tag = R.omit(
      ["softwares"],
      await TagUseCases.createTag({
        categoryId: tagCategory.id,
        name: faker.lorem.word(),
        softwareId: createdSoftware.id,
      })
    );

    const software = await SoftwareUsecases.getSoftware({
      softwareId: createdSoftware.id,
    });

    expect(software).toMatchObject(createdSoftware);

    expect(software.tags).toHaveLength(1);
    expect(software.tags[0]).toEqual({ ...tag, tagCategory });

    expect(software.tags[0].tagCategory).toEqual(tagCategory);
  });
});
