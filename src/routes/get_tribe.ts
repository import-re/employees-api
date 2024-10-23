import {
    FastifyInstance,
    FastifyReply,
    FastifyRequest,
    RouteOptions
} from "fastify";

export default function getIndex(fastify: FastifyInstance): RouteOptions {
    return {
        method: "GET",
        url: "/api/tribes/:id",
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            reply.code(501);
        }
    }
}