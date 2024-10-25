import Fastify, { FastifyInstance } from "fastify";
import routes from "./routes";
import knexPlugin from "./plugins/knex-plugins";
import redisPlugin from "./plugins/redis-plugins";


const fastify: FastifyInstance = Fastify();

fastify.register(knexPlugin);
fastify.register(redisPlugin);
fastify.register(routes);

fastify
  .listen({ port: 3000, host: "0.0.0.0" })
  .then(() => {
    console.log(`Server running! ✅`);
  })
  .catch((error: Error) => {
    console.log(error.message);
    console.log(`Error occured, server is shutting down 🫡`);
    fastify.log.error(error);
    process.exit(1);
  });