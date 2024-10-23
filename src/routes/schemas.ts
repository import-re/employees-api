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