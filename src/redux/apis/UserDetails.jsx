import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const UserDetailsApi = createApi({
  reducerPath: "UserDetails",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyapi.io/data/v1/",
  }),
  endpoints(builder) {
    return {
      fetchUserDetails: builder.query({
        query: (id) => {
          return {
            url: `user/${id}`,
            method: "GET",
            headers: {
              "app-id": "65956feced1269023544412a",
            },
          };
        },
      }),
    };
  },
});

export { UserDetailsApi };
export const { useFetchUserDetailsQuery } = UserDetailsApi;
