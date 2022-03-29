import faker from "faker";
import * as TagUseCase from "Domain/Tag/Usecase";

import { Connection } from "Database";

beforeAll(Connection.init);
afterAll(Connection.close);

describe("Tag createTagCategory UseCase", () => {
  const tagCategoryData = {
    description: faker.lorem.sentence(),
    name: "commodi",
    isMultiTag: false,
  };

  test("can create a tag category", async () => {
    const createdTagCategory = await TagUseCase.createTagCategory(
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

    await expect(TagUseCase.createTagCategory(tagCategoryData)).rejects.toThrow(
      Error
    );

    await expect(
      TagUseCase.createTagCategory(upperCaseTagCategory)
    ).rejects.toThrow(Error);

    await expect(TagUseCase.createTagCategory(lowerCaseName)).rejects.toThrow(
      Error
    );
  });
});
