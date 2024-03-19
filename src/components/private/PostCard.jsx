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
    <div className="m-2">
      <Link
        to={`/post/${post.$id}`}
        className="bg-[#D3ECE8] w-full h-32 mb-2 p-2 flex relative"
      >
        <img className="object-cover h-full w-1/4" src={image} />
        <div className="w-3/4  flex flex-col justify-between p-2  ">
          <h1 className="font-semibold text-xl">{post.title}</h1>
          <div>{parser(post.content)}</div>
          <div className="italic text-xs flex items-center justify-between  ">
            <h3 className="capitalize">Posted By : {post.userName}</h3>
            <h3>{formatDistanceToNow(post.$createdAt)} ago</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
