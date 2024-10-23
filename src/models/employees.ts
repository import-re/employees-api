import { FastifyInstance } from "fastify";

const TABLE_NAME = "employees";

export interface Employee {
    id: number,
    name: string,
    title: string,
    tribe_id: number
};

export async function getEmployees(fastify: FastifyInstance) {
    return await fastify.db.from(TABLE_NAME)
        .innerJoin("tribes", "tribes.id", "employees.tribe_id")
        .select();
}