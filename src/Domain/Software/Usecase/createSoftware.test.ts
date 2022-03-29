import * as SoftwareUsecase from "Domain/Software/Usecase";
import { Connection as DatabaseConnection } from "Database";
import faker from "faker";

beforeAll(DatabaseConnection.init);
afterAll(DatabaseConnection.close);

describe("Software createSoftware useCase", () => {
  test("can create a software", async () => {
    const software = {
      description: faker.lorem.paragraph(),
      link: faker.internet.url(),
      name: faker.name.firstName() + faker.name.lastName(),
    };

    const createdSoftware = await SoftwareUsecase.createSoftware(software);

    expect(createdSoftware).toHaveProperty("id");
    expect(createdSoftware).toMatchObject(software);
  });
});
