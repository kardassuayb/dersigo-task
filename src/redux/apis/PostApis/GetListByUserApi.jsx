import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const GetListByUserApi = createApi({
  reducerPath: "getListByUser",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyapi.io/data/v1/",
  }),
  endpoints(builder) {
    return {
      fetchGetListByUser: builder.query({
        query: (id) => {
          return {
            url: `user/${id}/post`,
            method: "GET",
            params: {
              limit: 20,
            },
            headers: {
              "app-id": "65956feced1269023544412a",
            },
          };
        },
      }),
    };
  },
});

export { GetListByUserApi };
export const { useFetchGetListByUserQuery } = GetListByUserApi;
