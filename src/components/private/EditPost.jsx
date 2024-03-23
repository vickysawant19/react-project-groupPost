import React from "react";
import { useParams } from "react-router-dom";
import PostForm from "./PostForm";

import { useGetPostQuery } from "../../store/postSlice";

const EditPost = () => {
  const { id } = useParams();

  const { data: postData, isLoading } = useGetPostQuery(id);

  return <div>{postData && <PostForm post={postData} />}</div>;
};

export default EditPost;
