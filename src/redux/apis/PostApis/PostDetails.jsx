import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PostDetailsApi = createApi({
  reducerPath: "PostDetails",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyapi.io/data/v1/",
  }),
  endpoints(builder) {
    return {
      fetchPostDetails: builder.query({
        query: (id) => {
          return {
            url: `post/${id}`,
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

export { PostDetailsApi };
export const { useFetchPostDetailsQuery } = PostDetailsApi;
