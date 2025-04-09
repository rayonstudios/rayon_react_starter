import { components, operations } from "./openapi-fetch";

export type ApiSchemas = components["schemas"];

export type ApiQueryParams<T extends keyof operations> = NonNullable<
  operations[T]["parameters"]["query" extends keyof operations[T]["parameters"]
    ? "query"
    : never]
>;

export type ApiBody<T extends keyof operations> = NonNullable<
  operations[T]["requestBody"] extends { content: { "application/json": any } }
    ? operations[T]["requestBody"]["content"]["application/json"]
    : operations[T]["requestBody"] extends {
          content: { "multipart/form-data": any };
        }
      ? operations[T]["requestBody"]["content"]["multipart/form-data"]
      : never
>;

export type ApiResponse<T extends keyof operations> = NonNullable<
  operations[T]["responses"] extends {
    "200": { content: { "application/json": { data: any } } };
  }
    ? operations[T]["responses"]["200"]["content"]["application/json"]["data"]
    : never
>;

export type Profile = ApiResponse<"ProfileFetch">;
export type Post = ApiResponse<"PostFetch">;
export type User = ApiResponse<"UserFetch">;
