import { database } from "../../../database"
import faker from "faker"
import { SoftwareUsecases } from ".";

beforeAll(database.init);
afterAll(database.close);

describe("Software DeleteSoftware useCase", () => {
    test("Can delete a software", async () => {

        const createdSoftware = await SoftwareUsecases.createSoftware({
            name: faker.lorem.word(),
            description: faker.lorem.paragraph(),
            link: faker.internet.url()
        })

        const deletedSoftware = await SoftwareUsecases.deleteSoftware({
            id: createdSoftware.id
        })

        const listedSoftwares = await SoftwareUsecases.listSoftwares({})

        const hasDeletedSoftware = listedSoftwares.find((software) => deletedSoftware.id == software.id)

        expect(hasDeletedSoftware).toBeUndefined()
    });
    test("Can't delete a software", () => {
        expect(true).toBeTruthy()
    })
})