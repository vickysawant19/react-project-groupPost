import React, { useEffect, useState } from "react";
import dbservice from "../../appwrite/database";
import PostCard from "./PostCard";
import { formatDistanceToNow } from "date-fns";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const [isdelete, setIsDelete] = useState(false);

  const navigate = useNavigate();
  const userData = useSelector(selectUser);

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

  useEffect(() => {
    getposts();
  }, [isdelete]);

  return (
    <div className="w-full  flex flex-wrap h-full">
      <div
        className={`${
          isdelete
            ? "bg-gray-400 w-full h-full absolute z-20 flex items-center justify-center"
            : "hidden"
        }`}
      >
        Loading...
      </div>
      <div class="flex flex-wrap md:max-w-screen-xl mx-auto w-full  ">
        {posts &&
          posts.map((post) => {
            const isAuther = userData.$id === post.userId;

            return (
              <div
                key={post.$id}
                className="md:w-1/4  w-full rounded  relative p-2"
              >
                <PostCard post={post} />

                <div className=" flex justify-end mr-4 gap-3 absolute z-10 right-2 top-5 text-sm">
                  {isAuther && (
                    <>
                      <Button
                        onClick={() => {
                          navigate(`/editpost/${post.$id}`);
                        }}
                        type="button"
                        bgColor="bg-green-600"
                        textColor="text-white"
                        className="shadow-xl md:shadow-white"
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
                        className="shadow-xl md:shadow-white"
                        disabled={isdelete}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Posts;
