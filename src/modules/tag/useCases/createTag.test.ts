import faker from "faker";
import { apFirst } from "fp-ts/lib/Either";
import { TagUseCases } from ".";
import { database } from "../../../database";
import { Software } from "../../../database/entities/Software";
import { TagCategory } from "../../../database/entities/TagCategory";
import { SoftwareUsecases } from "../../software/usecases";

let software: Software;
let notMultiTagCategory: TagCategory;
let multiTagCategory: TagCategory;

beforeAll(async () => {
  await database.init();

  software = await SoftwareUsecases.createSoftware({
    description: faker.lorem.sentence(),
    link: faker.internet.url(),
    name: faker.name.firstName(),
  });

  notMultiTagCategory = await TagUseCases.createTagCategory({
    description: faker.lorem.sentence(),
    name: faker.name.jobArea(),
    isMultiTag: false,
  });

  multiTagCategory = await TagUseCases.createTagCategory({
    description: faker.lorem.sentence(),
    name: faker.name.jobType(),
    isMultiTag: true,
  });
});

afterAll(database.close);

describe("Tag createTag UseCase", () => {
  test("can create many tags on a multiTag Category to the same software", async () => {
    const length = 3;
    const tagNames = Array.from({ length }, () => faker.datatype.uuid());

    const tags = await Promise.all(
      tagNames.map((name) =>
        TagUseCases.createTag({
          categoryId: multiTagCategory.id,
          softwareId: software.id,
          name,
        })
      )
    );

    expect(tags).toHaveLength(length);

    expect(tags).toMatchObject(tagNames.map((name) => ({ name })));

    tags.forEach((tag) => {
      expect(tag).toHaveProperty("id");
      expect(tag).toHaveProperty("tagCategoryId", multiTagCategory.id);
      expect(tag).toHaveProperty("softwareId", software.id);
    });
  });

  test("cannot create many tag to a no multiTag Category", async () => {
    const firstTagName = faker.datatype.uuid();
    const secondTagName = faker.datatype.uuid();

    await TagUseCases.createTag({
      categoryId: notMultiTagCategory.id,
      softwareId: software.id,
      name: firstTagName,
    });

    await expect(
      TagUseCases.createTag({
        categoryId: notMultiTagCategory.id,
        softwareId: software.id,
        name: secondTagName,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  test("cannot create a tag with existent name", async () => {
    const tagName = faker.datatype.uuid();

    await TagUseCases.createTag({
      categoryId: multiTagCategory.id,
      softwareId: software.id,
      name: tagName,
    });

    await expect(
      TagUseCases.createTag({
        categoryId: multiTagCategory.id,
        softwareId: software.id,
        name: tagName,
      })
    ).rejects.toBeInstanceOf(Error);

    await expect(
      TagUseCases.createTag({
        categoryId: multiTagCategory.id,
        softwareId: software.id,
        name: tagName.toUpperCase(),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
