import {
    FastifyInstance,
    FastifyReply,
    FastifyRequest,
    RouteOptions
} from "fastify";

import * as employeeModel from "../models/employees";
import { GetParamsSchema, GetParamsType } from "./schemas";

export default function getIndex(fastify: FastifyInstance): RouteOptions {
    return {
        method: "GET",
        url: "/api/employees/:id",
        schema: {
            params: GetParamsSchema
        },
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            const { id } = request.params as GetParamsType;
            const data = await employeeModel.getEmployee(fastify, id);
            if (data === null) {
                reply.code(404).send(`No employee with id ${id}`);
            }
            return reply.send(data);
        }
    }
}