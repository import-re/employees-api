import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteOptions,
} from "fastify";

import * as employeeModel from "../models/employees";

export default function getIndex(fastify: FastifyInstance): RouteOptions {
  return {
    method: "GET",
    url: "/api/report",
    handler: async function (request: FastifyRequest, reply: FastifyReply) {
      const data = await employeeModel.getReport(fastify);
      reply.send(data);
    },
  };
}
