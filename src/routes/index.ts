import { FastifyInstance } from "fastify";
import getEmployees from "./get-employees";
import getEmployee from "./get-employee";
import postEmployees from "./post-employees";
import deleteEmployee from "./delete-employee";
export default async function (fastify: FastifyInstance) {
    fastify.route(getEmployees(fastify));
    fastify.route(getEmployee(fastify));
    fastify.route(postEmployees(fastify));
    fastify.route(deleteEmployee(fastify));
}