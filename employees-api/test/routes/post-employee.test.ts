import { destroyTestDb, generateTestDb } from "../test-data";
import getTestFastify from "../test-fastify";

const app = getTestFastify();

describe("POST /api/employees", () => {
    beforeEach(async () => {
        await generateTestDb(app);
    });

    afterEach(async () => {
        await destroyTestDb(app);
    });

    it("the db should add a new employee", async () => {
        const res = await app.inject({
            url: "/api/employees",
            method: "POST",
            body: {
                name: "test!!",
                title: "testt",
                tribe_id: 1
            },
        });

        expect(res.statusCode).toEqual(200);
    });

    it("it should respond with 404 because foreign key does not exitst", async () => {
        const res = await app.inject({
            url: "/api/employees",
            method: "POST",
            body: {
                name: "test!!",
                title: "testt",
                tribe_id: 1525245
            },
        });
        expect(res.statusCode).toEqual(404);
    })
});