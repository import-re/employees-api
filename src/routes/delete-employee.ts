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
        method: "DELETE",
        url: "/api/employees/:id",
        schema: {
            params: GetParamsSchema
        },
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            const { id } = request.params as GetParamsType;
            await employeeModel.deleteEmployee(fastify, id);
            return reply.code(204).send();
        }
    }
}