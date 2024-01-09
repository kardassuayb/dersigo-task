import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { UsersApi } from "./apis/UsersApi";
import { UserDetailsApi } from "./apis/UserDetails";

export const store = configureStore({
  reducer: {
    [UsersApi.reducerPath]: UsersApi.reducer,
    [UserDetailsApi.reducerPath]: UserDetailsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(UsersApi.middleware)
      .concat(UserDetailsApi.middleware),
});

setupListeners(store.dispatch);

export {
  useFetchUsersQuery,
  useAddUserMutation,
  useRemoveUserMutation,
  useUpdateUserMutation,
} from "./apis/UsersApi";
export { useFetchUserDetailsQuery } from "./apis/UserDetails";
