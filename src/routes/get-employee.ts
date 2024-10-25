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
            if (data === null || data === undefined) {
                reply.code(404).send({error: `No employee with id ${id} is found`});
            }
            return reply.send(data);
        }
    }
}