import { TagUseCases } from ".";
import { database } from "../../../database";
import faker from "faker";

beforeAll(database.init);
afterAll(database.close);

describe("Tag listTagCategory useCase", () => {
  test("can list created categories", async () => {
    const length = 3;
    const tagCategoryInputs = Array.from({ length }, () => ({
      name: faker.name.firstName(),
      description: faker.lorem.sentence(),
      isMultiTag: faker.datatype.boolean(),
    }));

    const createdTagCategories = await Promise.all(
      tagCategoryInputs.map((input) => TagUseCases.createTagCategory(input))
    );

    const listedTagCategories = await TagUseCases.listTagCategories();

    expect(listedTagCategories.length).toBe(createdTagCategories.length);

    createdTagCategories.forEach((createdCategory) => {
      const listedCategory = listedTagCategories.find(
        (listedCategory) => listedCategory.id === createdCategory.id
      );

      expect(listedCategory).toEqual(createdCategory);
    });
  });
});
