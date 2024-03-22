import React, { useEffect, useState } from "react";

import PostCard from "./PostCard";

import { useGetPostsQuery } from "../../store/postSlice";

const Posts = () => {
  const { data: postData, isLoading } = useGetPostsQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full  flex flex-wrap h-full">
      <div className="flex flex-wrap md:max-w-screen-xl mx-auto w-full  ">
        {postData.documents &&
          postData.documents.map((post) => {
            return (
              <div
                key={post.$id}
                className="md:w-1/4  w-full rounded  relative p-2"
              >
                <PostCard post={post} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Posts;
