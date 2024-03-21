import React, { useEffect, useState } from "react";
import dbservice from "../../appwrite/database";
import parser from "html-react-parser";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const PostCard = ({ post }) => {
  const [image, setImage] = useState();
  const getImage = async () => {
    const image = await dbservice.getFilePreview(post.featuredImage);
    setImage(image);
  };

  useEffect(() => {
    getImage();
  }, [post]);

  return (
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
  );
};

export default PostCard;
