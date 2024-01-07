import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const UsersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyapi.io/data/v1/",
  }),
  endpoints(builder) {
    return {
      fetchUsers: builder.query({
        // providesTags: ["User"],
        query: () => {
          return {
            url: "user",
            method: "GET",
            headers: {
              "app-id": "65956feced1269023544412a",
            },
          };
        },
      }),
      //   addProduct: builder.mutation({
      //     invalidatesTags: ["Product"],
      //     query: (newProduct) => {
      //       return {
      //         url: "Add",
      //         method: "POST",
      //         body: newProduct,
      //       };
      //     },
      //   }),
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
  //   useAddProductMutation,
  //   useRemoveProductMutation,
  //   useUpdateProductMutation,
} = UsersApi;
