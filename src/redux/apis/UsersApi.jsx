import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const UsersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyapi.io/data/v1/",
  }),
  endpoints(builder) {
    return {
      fetchUsers: builder.query({
        providesTags: ["Users"],
        query: () => {
          return {
            url: "user",
            method: "GET",
            params: {
              limit: 21,
              page: 4,
            },
            headers: {
              "app-id": "65956feced1269023544412a",
            },
          };
        },
      }),
      addUser: builder.mutation({
        invalidatesTags: ["Users"],
        query: (newUser) => {
          return {
            url: "user/create",
            method: "POST",
            params: {
              created: 1,
            },
            headers: {
              "app-id": "65956feced1269023544412a",
            },
            body: newUser,
          };
        },
      }),
      removeUser: builder.mutation({
        invalidatesTags: ["Users"],
        query: (id) => {
          return {
            url: `user/${id}`,
            method: "DELETE",
            headers: {
              "app-id": "65956feced1269023544412a",
            },
            body: {
              id,
            },
          };
        },
      }),
      updateUser: builder.mutation({
        invalidatesTags: ["Users"],
        query: (updateUser) => {
          const { id /*güncellenen veri*/ } = updateUser;
          return {
            url: `user/${id}`,
            method: "PUT",
            headers: {
              "app-id": "65956feced1269023544412a",
            },
            body: {
              //güncellenen veri
            },
          };
        },
      }),
    };
  },
});

export { UsersApi };
export const {
  useFetchUsersQuery,
  useAddUserMutation,
  useRemoveUserMutation,
  useUpdateUserMutation,
} = UsersApi;
