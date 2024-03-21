import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "./PostForm";
import dbservice from "../../appwrite/database";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState();

  const getpost = async () => {
    const postDataa = await dbservice.getPost(id);
    if (postDataa) {
      setPostData(postDataa);
    } else {
      navigate("/posts");
    }
  };

  useEffect(() => {
    getpost();
  }, []);

  return <div>{postData && <PostForm post={postData} />}</div>;
};

export default EditPost;
