import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteOptions,
} from "fastify";

import * as employeeModel from "../models/employees";
import { GetParamsType, PostBodySchema, PostBodyType } from "./schemas";

export default function getIndex(fastify: FastifyInstance): RouteOptions {
  return {
    method: "PUT",
    url: "/api/employees/:id",
    schema: {
      body: PostBodySchema,
    },
    handler: async function (request: FastifyRequest, reply: FastifyReply) {
      const { id } = request.params as GetParamsType;
      const newInfo = request.body as PostBodyType;
      const employees = await employeeModel.putEmployee(fastify, id, newInfo);
      if (!employees) {
        reply.code(404).send("Given tribe id does not exist.");
      }
      reply.send(employees);
    },
  };
}
