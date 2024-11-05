import Fastify from "fastify";
import knexPlugin from "../employees-api/src/plugins/knex-plugins";
import redisPlugin from "../employees-api/src/plugins/redis-plugins";
import routes from "../employees-api/src/routes";

jest.mock("redis", () => ({
  createClient: jest.fn().mockReturnValue({
    connect: jest.fn(),
    disconnect: jest.fn(),
    get: jest.fn().mockResolvedValue(undefined),
    set: jest.fn(),
    del: jest.fn(),
  }),
}));

export default function () {
  const testApp = Fastify();
  beforeAll(async () => {
    testApp.register(routes);
    testApp.register(knexPlugin);
    testApp.register(redisPlugin);
    await testApp.ready();
  });
  afterAll(() => testApp.close());
  return testApp;
}
