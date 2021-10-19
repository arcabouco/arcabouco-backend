import { SoftwareUsecases } from ".";
import { database } from "../../../database";
import faker from "faker";

beforeAll(database.init);
afterAll(database.close);

describe("Software useCase createSoftware", () => {
  test("can create a software", async () => {
    const software = {
      description: faker.lorem.paragraph(),
      link: faker.internet.url(),
      name: faker.name.firstName() + faker.name.lastName(),
    };

    const createdSoftware = await SoftwareUsecases.createSoftware(software);

    expect(createdSoftware).toHaveProperty("id");
    expect(createdSoftware).toMatchObject(software);
  });
});
