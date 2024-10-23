import fastify, { FastifyInstance } from "fastify";
import { PostBodyType } from "../routes/schemas";
import { Tribe } from "./tribe";

const TABLE_NAME = "employees";

export interface Employee {
    id: number,
    name: string,
    title: string,
    tribe: Tribe
};

interface EmployeeQueryResult {
    id: number,
    name: string,
    title: string,
    tribe_id: number,
    tribe_name: string,
    department: string
};

interface EmployeeDTO {
    id: number,
    name: string,
    title: string,
    tribe : {
        tribe_id: number,
        tribe_name: string,
        department: string
    }
};

const formatEmployeeDTO = (queryResult: EmployeeQueryResult): EmployeeDTO => {
    return {
        id: queryResult.id,
        name: queryResult.name,
        title: queryResult.title,
        tribe: {
            tribe_id: queryResult.tribe_id,
            tribe_name: queryResult.tribe_name,
            department: queryResult.department
        }
    }
}

export async function getEmployees(fastify: FastifyInstance) {
    const data = await fastify.db.from(TABLE_NAME).leftJoin("tribes", "tribes.tribe_id", "employees.tribe_id").select();
    return data.map(formatEmployeeDTO);
}

export async function getEmployee(fastify: FastifyInstance, id: number) {
    const data: EmployeeQueryResult[] = await fastify.db.from(TABLE_NAME).leftJoin("tribes", "tribes.tribe_id", "employees.tribe_id").select().where({ "employees.id":id });
    console.log(data[0]);
    if (data === undefined || data === null) {
        return null;
    }
    return data.map(formatEmployeeDTO)[0];
    
}

export async function postEmployees(fastify: FastifyInstance, newEmployee: PostBodyType) {
    return await fastify.db.from(TABLE_NAME).insert({
        name: newEmployee.name,
        title: newEmployee.title,
        tribe_id: newEmployee.tribe_id
    })
};