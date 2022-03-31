// import * as TagUsecase from "Domain/Tag/Usecase";
// import { Connection } from "Database";
// import faker from "faker";

// beforeAll(Connection.init);
// afterAll(Connection.close);

// describe("Tag listTagCategory useCase", () => {
//   test("can list created categories", async () => {
//     const length = 3;
//     const tagCategoryInputs = Array.from({ length }, () => ({
//       name: faker.name.firstName(),
//       description: faker.lorem.sentence(),
//       isMultiTag: faker.datatype.boolean(),
//     }));

//     const createdTagCategories = await Promise.all(
//       tagCategoryInputs.map((input) => TagUsecase.createTagCategory(input))
//     );

//     const listedTagCategories = await TagUsecase.listTagCategories();

//     expect(listedTagCategories.length).toBe(createdTagCategories.length);

//     createdTagCategories.forEach((createdCategory) => {
//       const listedCategory = listedTagCategories.find(
//         (listedCategory) => listedCategory.id === createdCategory.id
//       );

//       expect(listedCategory).toEqual(createdCategory);
//     });
//   });
// });
