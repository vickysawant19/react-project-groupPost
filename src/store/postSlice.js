import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import dbservice, { dbService } from "../appwrite/database";

export const postApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ credentials: "include" }),
  tagTypes: ["post"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      async queryFn() {
        const res = await dbservice.getPosts();
        return { data: res };
      },
      providesTags: ["post"],
    }),
    getPost: builder.query({
      async queryFn(slug) {
        const res = await dbservice.getPost(slug);
        return { data: res };
      },
    }),
    updatePost: builder.mutation({
      async queryFn({ id, post }) {
        const res = await dbservice.updateDocument(id, post);
        return { data: res };
      },
    }),
    deletePost: builder.mutation({
      async queryFn() {},
    }),
  }),
});

export const {
  useGetPostQuery,
  useGetPostsQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
} = postApi;
