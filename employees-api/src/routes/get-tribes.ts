import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteOptions,
} from "fastify";

import * as tribeModel from "../models/tribe";

export default function getIndex(fastify: FastifyInstance): RouteOptions {
  return {
    method: "GET",
    url: "/api/tribes",
    handler: async function (request: FastifyRequest, reply: FastifyReply) {
      const data = await tribeModel.getTribes(fastify);
      console.log(data);
      reply.send(data);
    },
  };
}
