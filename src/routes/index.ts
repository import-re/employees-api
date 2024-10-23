import { FastifyInstance } from "fastify";
import getEmployees from "./get-employees";

export default async function (fastify: FastifyInstance) {
    fastify.route(getEmployees(fastify));
}