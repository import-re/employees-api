import {
    FastifyInstance,
    FastifyReply,
    FastifyRequest,
    RouteOptions
} from "fastify";

import * as employeeModel from "../models/employees";
import { PostBodySchema, PostBodyType } from "./schemas";

export default function getIndex(fastify: FastifyInstance): RouteOptions {
    return {
        method: "POST",
        url: "/api/employees",
        schema: {
            body: PostBodySchema
        },
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            const newEmployee = request.body as PostBodyType;
            const employees = await employeeModel.postEmployees(fastify, newEmployee);
            reply.send(employees);    
        }
    };
}