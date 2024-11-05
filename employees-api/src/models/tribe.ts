import fastify, { FastifyInstance } from "fastify";

const TABLE_NAME = "tribes";

export interface Tribe {
  tribe_id: number;
  tribe_name: string;
  department: string;
}

export async function getTribes(fastify: FastifyInstance) {
  return await fastify.db.from(TABLE_NAME).select();
}
