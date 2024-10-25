import fastify, { FastifyInstance } from "fastify";
import { PostBodyType, SearchQueryType } from "../routes/schemas";
import { Tribe } from "./tribe";

const TABLE_NAME = "employees";
const GET_EMPLOYEES_CACHE_KEY = "getEmployees";

export interface Employee {
  id: number;
  name: string;
  title: string;
  tribe: Tribe;
}

interface EmployeeQueryResult {
  id: number;
  name: string;
  title: string;
  tribe_id: number;
  tribe_name: string;
  department: string;
}

interface EmployeeDTO {
  id: number;
  name: string;
  title: string;
  tribe: {
    tribe_id: number;
    tribe_name: string;
    department: string;
  };
}

const formatEmployeeDTO = (queryResult: EmployeeQueryResult): EmployeeDTO => {
  return {
    id: queryResult.id,
    name: queryResult.name,
    title: queryResult.title,
    tribe: {
      tribe_id: queryResult.tribe_id,
      tribe_name: queryResult.tribe_name,
      department: queryResult.department,
    },
  };
};

export async function getEmployees(
  fastify: FastifyInstance,
  query: SearchQueryType
) {
  const data = fastify.db
    .from(TABLE_NAME)
    .leftJoin("tribes", "tribes.tribe_id", "employees.tribe_id")
    .select();
    if (!query.name && !query.title && !query.tribe) {
        const cache = await fastify.cache.get(GET_EMPLOYEES_CACHE_KEY);
        if (cache) {
            return JSON.parse(cache);
        }
    }
  if (query.name) data.whereLike("employees.name", `%${query.name}%`);
  if (query.title) data.whereLike("employees.title", `%${query.title}%`);
  if (query.tribe) data.whereLike("tribes.tribe_name", `%${query.tribe}%`);
  const result = (await data.then()).map(formatEmployeeDTO);
  await fastify.cache.set(GET_EMPLOYEES_CACHE_KEY, await JSON.stringify(result)); 
  return result;
}

export async function getEmployee(fastify: FastifyInstance, id: number) {
  const data: EmployeeQueryResult[] = await fastify.db
    .from(TABLE_NAME)
    .leftJoin("tribes", "tribes.tribe_id", "employees.tribe_id")
    .select()
    .where({ "employees.id": id });
    console.log("heree");
    console.log(id);
  if (data === undefined || data.length == 0) {
    return null;
  }
  return data.map(formatEmployeeDTO)[0];
}

export async function postEmployees(
  fastify: FastifyInstance,
  newEmployee: PostBodyType
) {
  const tribe_id = newEmployee.tribe_id;
  const tribe = await fastify.db.from("tribes").where({ tribe_id }).select();
  console.log(tribe);
  if (tribe.length == 0) return null;
  const data = await fastify.db.from(TABLE_NAME).insert({
    name: newEmployee.name,
    title: newEmployee.title,
    tribe_id: newEmployee.tribe_id,
  });
  return data;
}

export async function deleteEmployee(
  fastify: FastifyInstance,
  id: number
): Promise<void> {
  await fastify.db.from(TABLE_NAME).where({ "employees.id": id }).del();
}
