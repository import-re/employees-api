import {
    FastifyInstance,
    FastifyReply,
    FastifyRequest,
    RouteOptions
} from "fastify";

import * as employeeModel from "../models/employees";

export default function getIndex(fastify: FastifyInstance): RouteOptions {
    return {
        method: "GET",
        url: "/api/employees",
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            reply.send(employeeModel.getEmployees(fastify));
        }
    }
}