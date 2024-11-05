import { FastifyInstance } from "fastify";
import getEmployees from "./get-employees";
import getEmployee from "./get-employee";
import postEmployees from "./post-employees";
import deleteEmployee from "./delete-employee";
import getTribes from "./get-tribes";
import putEmployee from "./put-employees";
import getReport from "./get-report";

export default async function (fastify: FastifyInstance) {
  fastify.route(getEmployees(fastify));
  fastify.route(getEmployee(fastify));
  fastify.route(postEmployees(fastify));
  fastify.route(deleteEmployee(fastify));
  fastify.route(getTribes(fastify));
  fastify.route(putEmployee(fastify));
  fastify.route(getReport(fastify));
}
