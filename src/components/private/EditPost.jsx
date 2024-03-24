import React, { useEffect, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "./PostForm";

import { useGetPostQuery } from "../../store/postSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";

const EditPost = () => {
  const userData = useSelector(selectUser);
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: postData, isLoading } = useGetPostQuery(id);

  useLayoutEffect(() => {
    if (postData) {
      if (userData.$id !== postData.userId) {
        navigate("/posts");
      }
    }
  }, [postData]);

  return <div>{postData ? <PostForm post={postData} /> : "Loading... "}</div>;
};

export default EditPost;
