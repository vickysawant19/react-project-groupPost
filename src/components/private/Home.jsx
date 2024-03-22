import React from "react";
import Posts from "./Posts";
import { useGetPostsQuery } from "../../store/postSlice";
import PostCard from "./PostCard";

const Home = () => {
  const { data, isLoading, error } = useGetPostsQuery();

  return (
    <div className="w-full max-w-screen-xl mx-auto flex flex-wrap">
      {data &&
        data.documents.map((post) => (
          <div
            key={post.$id}
            className="md:w-1/4  w-full rounded  relative p-2"
          >
            <PostCard post={post} />
          </div>
        ))}
    </div>
  );
};

export default Home;
