import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { UsersApi } from "./apis/UsersApi";
import { UserDetailsApi } from "./apis/UserDetails";
import { PostsApi } from "./apis/PostApis/PostsApi";
import { PostDetailsApi } from "./apis/PostApis/PostDetails";
import { GetListByUserApi } from "./apis/PostApis/GetListByUserApi";

export const store = configureStore({
  reducer: {
    [UsersApi.reducerPath]: UsersApi.reducer,
    [UserDetailsApi.reducerPath]: UserDetailsApi.reducer,
    [PostsApi.reducerPath]: PostsApi.reducer,
    [PostDetailsApi.reducerPath]: PostDetailsApi.reducer,
    [GetListByUserApi.reducerPath]: GetListByUserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(UsersApi.middleware)
      .concat(UserDetailsApi.middleware)
      .concat(PostsApi.middleware)
      .concat(PostDetailsApi.middleware)
      .concat(GetListByUserApi.middleware),
});

setupListeners(store.dispatch);

export {
  useFetchUsersQuery,
  useAddUserMutation,
  useRemoveUserMutation,
  useUpdateUserMutation,
} from "./apis/UsersApi";
export { useFetchUserDetailsQuery } from "./apis/UserDetails";
export {
  useFetchPostsQuery,
  useAddPostMutation,
  useRemovePostMutation,
  useUpdatePostMutation,
} from "./apis/PostApis/PostsApi";
export { useFetchPostDetailsQuery } from "./apis/PostApis/PostDetails";
export { useFetchGetListByUserQuery } from "./apis/PostApis/GetListByUserApi";
