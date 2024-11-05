import {
    FastifyInstance,
    FastifyReply,
    FastifyRequest,
    RouteOptions
} from "fastify";

import * as employeeModel from "../models/employees";
import { SearchQuerySchema, SearchQueryType } from "./schemas";

export default function getIndex(fastify: FastifyInstance): RouteOptions {
    return {
        method: "GET",
        url: "/api/employees",
        schema: {
            querystring: SearchQuerySchema,
        },
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            const query = request.query as SearchQueryType;
            reply.send(await employeeModel.getEmployees(fastify, query));
        }
    }
}