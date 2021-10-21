import faker from "faker";
import { TagUseCases } from ".";

import { database } from "../../../database";

beforeAll(database.init);
afterAll(database.close);

describe("Tag createTagCategory UseCase", () => {
  const tagCategoryData = {
    description: faker.lorem.sentence(),
    name: "commodi",
    isMultiTag: false,
  };

  test("can create a tag category", async () => {
    const createdTagCategory = await TagUseCases.createTagCategory(
      tagCategoryData
    );

    expect(createdTagCategory).toMatchObject(tagCategoryData);
    expect(createdTagCategory).toHaveProperty("id");
  });

  test("can't create a tag category if name already exists", async () => {
    const upperCaseTagCategory = {
      ...tagCategoryData,
      name: "COMMODI",
    };

    const lowerCaseName = {
      ...tagCategoryData,
      name: "commodi",
    };

    await expect(
      TagUseCases.createTagCategory(tagCategoryData)
    ).rejects.toThrow(Error);

    await expect(
      TagUseCases.createTagCategory(upperCaseTagCategory)
    ).rejects.toThrow(Error);

    await expect(TagUseCases.createTagCategory(lowerCaseName)).rejects.toThrow(
      Error
    );
  });
});
