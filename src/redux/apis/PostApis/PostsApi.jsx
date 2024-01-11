import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PostsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyapi.io/data/v1/",
  }),
  endpoints(builder) {
    return {
      fetchPosts: builder.query({
        providesTags: ["Posts"],
        query: () => {
          return {
            url: "post",
            method: "GET",
            params: {
              limit: 50,
              // page: 17,
            },
            headers: {
              "app-id": "65956feced1269023544412a",
            },
          };
        },
      }),
      addPost: builder.mutation({
        invalidatesTags: ["Posts"],
        query: (newPost) => {
          return {
            url: "post/create",
            method: "POST",
            params: {
              created: 1,
            },
            headers: {
              "app-id": "65956feced1269023544412a",
            },
            body: newPost,
          };
        },
      }),
      removePost: builder.mutation({
        invalidatesTags: ["Posts"],
        query: (id) => {
          return {
            url: `post/${id}`,
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
      updatePost: builder.mutation({
        invalidatesTags: ["Posts"],
        query: ({ id, formData }) => {
          return {
            url: `post/${id}`,
            method: "PUT",
            headers: {
              "app-id": "65956feced1269023544412a",
            },
            body: formData,
          };
        },
      }),
    };
  },
});

export { PostsApi };
export const {
  useFetchPostsQuery,
  useAddPostMutation,
  useRemovePostMutation,
  useUpdatePostMutation,
} = PostsApi;
