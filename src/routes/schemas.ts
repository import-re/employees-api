import { Static, Type } from "@sinclair/typebox";

export const PostBodySchema = Type.Object({
    name: Type.String(),
    title: Type.String(),
    tribe_id: Type.Number()
});

export type PostBodyType = Static<typeof PostBodySchema>;

export const GetParamsSchema = Type.Object({
    id: Type.Integer()
});

export type GetParamsType = Static<typeof GetParamsSchema>;


export const SearchQuerySchema = Type.Object({
    name: Type.Optional(Type.String()),
    title: Type.Optional(Type.String()),
    tribe: Type.Optional(Type.String()),
});

export type SearchQueryType = Static<typeof SearchQuerySchema>;