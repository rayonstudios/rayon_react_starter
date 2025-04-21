import { components, operations } from "./openapi-fetch";

type OperationParameters<T extends keyof operations> = NonNullable<
  operations[T]["parameters"]
>;
type OperationRequestBody<T extends keyof operations> = NonNullable<
  operations[T]["requestBody"]
>;
type OperationResponse<T extends keyof operations> = NonNullable<
  operations[T]["responses"]
>;

export type ApiSchemas = components["schemas"];

export type ApiQueryParams<T extends keyof operations> = NonNullable<
  OperationParameters<T>["query" extends keyof OperationParameters<T>
    ? "query"
    : never]
>;

export type ApiBody<T extends keyof operations> = NonNullable<
  OperationRequestBody<T> extends { content: { "application/json": any } }
    ? OperationRequestBody<T>["content"]["application/json"]
    : OperationRequestBody<T> extends {
          content: { "multipart/form-data": any };
        }
      ? NonNullable<OperationRequestBody<T>>["content"]["multipart/form-data"]
      : never
>;

export type ApiResponse<T extends keyof operations> = NonNullable<
  OperationResponse<T> extends {
    "200": { content: { "application/json": { data: any } } };
  }
    ? OperationResponse<T>["200"]["content"]["application/json"]["data"]
    : never
>;

export type Profile = ApiResponse<"ProfileFetch">;
export type Post = ApiResponse<"PostFetch">;
export type User = ApiResponse<"UserFetch">;
