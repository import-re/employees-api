import { destroyTestDb, generateTestDb } from "../test-data";
import getTestFastify from "../test-fastify";

const app = getTestFastify();

describe("DELETE /api/employees/:id", () => {
    beforeEach(async () => {
        await generateTestDb(app);
    });

    afterEach(async () => {
        await destroyTestDb(app);
    });

    it("it should delete employee with id 1", async () => {
        const res = await app.inject({
            url: "/api/employees/1",
            method: "DELETE"
        });
        console.log(res);
        const statusCode = res.statusCode;
        expect(statusCode).toEqual(204);
    })
});