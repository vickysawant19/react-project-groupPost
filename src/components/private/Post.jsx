import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectUser } from "../../store/userSlice";
import dbservice from "../../appwrite/database";
import parser from "html-react-parser";
import conf from "../../config/conf";
import authService from "../../appwrite/auth";

const Post = () => {
  const [postData, setPostData] = useState(null);
  const { id: postSlug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector(selectUser);
  const getpost = async () => {
    const post = await dbservice.getPost(postSlug);
    if (post) {
      const { href: fileUrl } = await dbservice.getFilePreview(
        post.featuredImage
      );
      // const username = await
      // console.log(fileUrl);
      setPostData({ ...post, image: fileUrl });
    } else {
      navigate("/posts");
    }
  };

  useEffect(() => {
    getpost();
  }, [userData]);

  return (
    <div className="w-full max-w-screen-xl mx-auto  h-screen">
      <div className="m-2 rounded p-2 bg-[#7EAAC2] ">
        <div className="font-semibold">{postData?.userId} :</div>
        <img
          className="w-full h-40 object-contain mb-2"
          src={postData?.image}
        />
        <div className="mb-2 font-semibold py-2"> Title: {postData?.title}</div>
        <div className="mb-2">Contain: {parser(String(postData?.content))}</div>
      </div>
    </div>
  );
};

export default Post;
