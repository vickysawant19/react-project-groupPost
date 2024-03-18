import React, { useEffect, useState } from "react";
import dbservice from "../../appwrite/database";
import PostCard from "./PostCard";
import { formatDistanceToNow } from "date-fns";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isdelete, setIsDelete] = useState(false);

  const navigate = useNavigate();

  const handledelete = async (id) => {
    setIsDelete(true);
    await dbservice.deleteDocument(id);
    setIsDelete(false);
  };

  const getposts = async () => {
    const posts = await dbservice.getPosts();
    if (posts) {
      setPosts(posts.documents);
    }
  };
  // console.log(posts);

  useEffect(() => {
    getposts();
  }, [isdelete]);

  return (
    <div className="">
      <div
        className={`${
          isdelete
            ? "bg-gray-400 w-full h-full absolute z-20 flex items-center justify-center"
            : "hidden"
        }`}
      >
        Loading...
      </div>
      Posts
      {posts &&
        posts.map((post) => (
          <div key={post.$id} className="relative">
            <PostCard post={post} />
            <div className=" flex justify-end mr-4 gap-3 absolute z-10 right-2 top-2 text-sm">
              <Button
                onClick={() => {
                  navigate(`/editpost/${post.$id}`);
                }}
                type="button"
                bgColor="bg-green-600"
                textColor="text-white"
                className=""
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  handledelete(post.$id);
                }}
                type="button"
                bgColor="bg-red-600"
                textColor="text-white"
                className=""
                disabled={isdelete}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Posts;
