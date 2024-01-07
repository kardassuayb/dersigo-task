import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const UserDetailsApi = createApi({
  reducerPath: "UserDetails",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyapi.io/data/v1/",
  }),
  endpoints(builder) {
    return {
      fetchUserDetails: builder.query({
        query: (userId) => {
          return {
            url: "user",
            params: {
              userId,
            },
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
