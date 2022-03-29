import faker from "faker";
import * as TagUsecase from "Domain/Tag/Usecase";
import { Connection } from "Database";
import { Software } from "Database/entities";
import { TagCategory } from "Database/entities";
import * as SoftwareUsecase from "Domain/Software/Usecase";

let software: Software;
let notMultiTagCategory: TagCategory;
let multiTagCategory: TagCategory;

beforeAll(async () => {
  await Connection.init();

  software = await SoftwareUsecase.createSoftware({
    description: faker.lorem.sentence(),
    link: faker.internet.url(),
    name: faker.name.firstName(),
  });

  notMultiTagCategory = await TagUsecase.createTagCategory({
    description: faker.lorem.sentence(),
    name: faker.name.jobArea(),
    isMultiTag: false,
  });

  multiTagCategory = await TagUsecase.createTagCategory({
    description: faker.lorem.sentence(),
    name: faker.name.jobType(),
    isMultiTag: true,
  });
});

afterAll(Connection.close);

describe("Tag createTag UseCase", () => {
  test("can create many tags on a multiTag Category to the same software", async () => {
    const length = 3;
    const tagNames = Array.from({ length }, () => faker.datatype.uuid());

    const tags = await Promise.all(
      tagNames.map((name) =>
        TagUsecase.createTag({
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
      expect(tag.softwares).toHaveLength(1);
      expect(tag.softwares[0].id).toBe(software.id);
    });
  });

  test("cannot create many tag to a no multiTag Category", async () => {
    const firstTagName = faker.datatype.uuid();
    const secondTagName = faker.datatype.uuid();

    await TagUsecase.createTag({
      categoryId: notMultiTagCategory.id,
      softwareId: software.id,
      name: firstTagName,
    });

    await expect(
      TagUsecase.createTag({
        categoryId: notMultiTagCategory.id,
        softwareId: software.id,
        name: secondTagName,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  test("cannot create a tag with existent name", async () => {
    const tagName = faker.datatype.uuid();

    await TagUsecase.createTag({
      categoryId: multiTagCategory.id,
      softwareId: software.id,
      name: tagName,
    });

    await expect(
      TagUsecase.createTag({
        categoryId: multiTagCategory.id,
        softwareId: software.id,
        name: tagName,
      })
    ).rejects.toBeInstanceOf(Error);

    await expect(
      TagUsecase.createTag({
        categoryId: multiTagCategory.id,
        softwareId: software.id,
        name: tagName.toUpperCase(),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
