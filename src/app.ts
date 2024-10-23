import Fastify, { FastifyInstance } from "fastify";
import routes from "./routes";
import knexPlugin from "./plugins/knex-plugins";

const fastify: FastifyInstance = Fastify();

fastify.register(knexPlugin);
fastify.register(routes);

fastify
  .listen({ port: 3000, host: "127.0.0.1" })
  .then(() => {
    console.log(`Server running! ✅`);
  })
  .catch((error: Error) => {
    console.log(error.message);
    console.log(`Error occured, server is shutting down 🫡`);
    fastify.log.error(error);
    process.exit(1);
  });