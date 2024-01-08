import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const UsersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyapi.io/data/v1/",
  }),
  endpoints(builder) {
    return {
      fetchUsers: builder.query({
        // providesTags: ["Users"],
        query: () => {
          return {
            url: "user",
            method: "GET",
            params: {
              limit: 30,
              page: 3,
            },
            headers: {
              "app-id": "65956feced1269023544412a",
            },
          };
        },
      }),
      addUser: builder.mutation({
        // invalidatesTags: ["Users"],
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
      //   removeProduct: builder.mutation({
      //     invalidatesTags: ["Product"],
      //     query: (product) => {
      //       return {
      //         url: "/Delete",
      //         method: "POST",
      //         body: {
      //           ConsumerId: "9e924124-dfec-4235-91b3-285b17cc4947",
      //           ConsumerUserId: "3b15e611-a2b2-4127-8309-38e9c9acd495",
      //           Id: product.id,
      //         },
      //       };
      //     },
      //   }),
      //   updateProduct: builder.mutation({
      //     invalidatesTags: ["Product"],
      //     query: (updateProduct) => {
      //       const { Id, ...rest } = updateProduct;
      //       return {
      //         url: "/Update",
      //         method: "POST",
      //         body: {
      //           Id,
      //           ConsumerId: "9e924124-dfec-4235-91b3-285b17cc4947",
      //           ConsumerUserId: "3b15e611-a2b2-4127-8309-38e9c9acd495",
      //           ...rest,
      //         },
      //       };
      //     },
      //   }),
    };
  },
});

export { UsersApi };
export const {
  useFetchUsersQuery,
  useAddUserMutation,
  //   useRemoveProductMutation,
  //   useUpdateProductMutation,
} = UsersApi;
