import { apiAuthSlice } from "../features/auth/auth-api-slice.ts";
import { apiTodoSlice } from "../features/todo/todo-api-slice.ts";
import { apiProfileSlice } from "../features/profile/profile-api-slice.ts";

export const middlewares = [
  apiAuthSlice.middleware,
  apiTodoSlice.middleware,
  apiProfileSlice.middleware,
];
