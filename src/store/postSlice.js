import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import dbservice from "../appwrite/database";

export const postApi = createApi({
  reducerPath: "postApi",
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

    createPost: builder.mutation({
      async queryFn(post) {
        try {
          const res = await dbservice.createDocument(post);
          return { data: res };
        } catch (error) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["post"],
    }),

    updatePost: builder.mutation({
      async queryFn(post) {
        try {
          const res = await dbservice.updateDocument(post.$id, post);
          return { data: res };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["post"],
    }),
    deletePost: builder.mutation({
      async queryFn(id) {
        try {
          const res = await dbservice.deleteDocument(id);
          return { data: res };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["post"],
    }),
  }),
});

export const {
  useGetPostQuery,
  useGetPostsQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
  useCreatePostMutation,
} = postApi;
