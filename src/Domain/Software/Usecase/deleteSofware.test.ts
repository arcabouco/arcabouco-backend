// import { Connection } from "Database";
// import faker from "faker";
// import * as SoftwareUsecase from "Domain/Software/Usecase";

// beforeAll(Connection.init);
// afterAll(Connection.close);

// describe("Software DeleteSoftware useCase", () => {
//   test("Can delete a software", async () => {
//     const createdSoftware = await SoftwareUsecase.createSoftware({
//       name: faker.lorem.word(),
//       description: faker.lorem.paragraph(),
//       link: faker.internet.url(),
//     });

//     const deletedSoftware = await SoftwareUsecase.deleteSoftware({
//       id: createdSoftware.id,
//     });

//     const listedSoftwares = await SoftwareUsecase.listSoftwares({});

//     const hasDeletedSoftware = listedSoftwares.find(
//       (software) => deletedSoftware.id == software.id
//     );

//     expect(hasDeletedSoftware).toBeUndefined();
//   });
//   test("Can't delete a software", () => {
//     expect(true).toBeTruthy();
//   });
// });
