import React, { useEffect, useState } from "react";
import dbservice from "../../appwrite/database";
import parser from "html-react-parser";
import { Link, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import Button from "../Button";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";

const PostCard = ({ post }) => {
  const [image, setImage] = useState();
  const userData = useSelector(selectUser);
  const navigate = useNavigate();

  const isAuther = userData.$id === post.userId;

  const getImage = async () => {
    const image = await dbservice.getFilePreview(post.featuredImage);
    setImage(image);
  };

  useEffect(() => {
    getImage();
  }, [post]);

  const handledelete = async (id) => {
    setIsDelete(true);
    await dbservice.deleteDocument(id);
    setIsDelete(false);
  };

  return (
    <>
      <Link
        to={`/post/${post.$id}`}
        className="w-full p-2 flex justify-between md:flex-col h-full bg-[#D3ECE8]  md:min-h-96"
      >
        <div className="flex md:flex-col w-full h-full ">
          <div className="w-1/4 md:w-full ">
            <img className="h-40 object-cover w-full " src={image} />
          </div>
          <div className="w-3/4 md:w-full h-full   flex flex-col justify-between p-2 ">
            <div>
              <h1 className="font-semibold text-xl">{post.title}</h1>
              <div>{parser(post.content, { trim: true })}</div>
            </div>
            <div className="italic text-xs flex items-center justify-between  ">
              <h3 className="capitalize">Posted By : {post.userName}</h3>
              <h3>{formatDistanceToNow(post.$createdAt)} ago</h3>
            </div>
          </div>
        </div>
      </Link>
      <div className=" flex justify-end mr-4 gap-3 absolute z-30 right-2 top-5 text-sm">
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
              disabled={""}
            >
              Delete
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default PostCard;
