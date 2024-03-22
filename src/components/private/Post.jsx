import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectUser } from "../../store/userSlice";
import dbservice from "../../appwrite/database";
import parser from "html-react-parser";
import { useGetPostQuery } from "../../store/postSlice";

const Post = () => {
  const { id: postSlug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector(selectUser);

  const { data: postData, isLoading } = useGetPostQuery(postSlug);

  const [imgUrl, setImgUrl] = useState(null);

  const getPostImg = async () => {
    try {
      if (postData) {
        const { href: fileUrl } = await dbservice.getFilePreview(
          postData.featuredImage
        );
        setImgUrl(fileUrl);
      }
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    getPostImg();
  }, [postData]);

  if (isLoading) {
    return <div>Loading....</div>;
  }
  return (
    <div className="w-full max-w-screen-xl bg-[#7EAAC2] mx-auto">
      <div className="rounded  flex flex-wrap w-full justify-center">
        <div className="md:w-1/3 w-full flex justify-center">
          {imgUrl && (
            <img
              className="object-contain md:max-h-screen w-full "
              src={imgUrl}
            />
          )}
        </div>

        <div className="mb-2 font-semibold capitalize w-full md:w-2/3">
          <div className="mb-2 p-2 capitalize text-xl text-blue-900 bg-white w-full font-bold ">
            {postData?.userName}
          </div>
          <div className="text-xl mb-4 font-semibold ml-2">
            {postData?.title}
          </div>
          <div className="mb-2 ml-2"> {parser(String(postData?.content))}</div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default Post;
