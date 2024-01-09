import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { UsersApi } from "./apis/UsersApi";
import { UserDetailsApi } from "./apis/UserDetails";
import { PostsApi } from "./apis/PostsApi";
import { PostDetailsApi } from "./apis/PostDetails";

export const store = configureStore({
  reducer: {
    [UsersApi.reducerPath]: UsersApi.reducer,
    [UserDetailsApi.reducerPath]: UserDetailsApi.reducer,
    [PostsApi.reducerPath]: PostsApi.reducer,
    [PostDetailsApi.reducerPath]: PostDetailsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(UsersApi.middleware)
      .concat(UserDetailsApi.middleware)
      .concat(PostsApi.middleware)
      .concat(PostDetailsApi.middleware),
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
} from "./apis/PostsApi";
export { useFetchPostDetailsQuery } from "./apis/PostDetails";
