import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import RTE from "../RTE";
import authService from "../../appwrite/auth";
import dbservice from "../../appwrite/database";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import { useUpdatePostMutation } from "../../store/postSlice";

const PostForm = ({ post }) => {
  const [img, setImg] = useState();
  const [previewImg, setPreviewImg] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  //TODO: Update using RTK
  const [updatePost, { data: updateData }] = useUpdatePostMutation();

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
        featuredImage: post?.featuredImage || "",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector(selectUser);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getImage = async () => {
    if (post) {
      const image = await dbservice.getFilePreview(post?.featuredImage);
      if (image) setImg(image);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getImage();
    setIsLoading(false);
  }, [post]);

  const submit = async (data) => {
    setIsLoading(true);
    setError(null);

    if (post) {
      const file = data.image[0]
        ? await dbservice.uploadFile(data.image[0])
        : null;

      if (file) {
        await dbservice.deleteFile(post.featuredImage);
      }

      const dbPost = await dbservice.updateDocument(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await dbservice.uploadFile(data.image[0]);
      if (file) {
        try {
          const fileId = file.$id;
          data.featuredImage = fileId;
          console.log(data);
          const dbPost = await dbservice.createDocument({
            ...data,
            userId: userData.$id,
            userName: userData.name,
          });
          console.log(dbPost);
          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        } catch (error) {
          setError(error.message);
          alert(error.message);
        }
      }
    }
    setIsLoading(false);
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]+/g, "-")
        .replace(/\s+/g, "-"); // Replace multiple spaces with a single dash
    }
    return value;
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue, slugTransform]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="md:flex p-2 max-w-screen-xl mx-auto"
    >
      <div className="md:w-2/3 w-full px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />

        <RTE
          label="Content : "
          name="content"
          control={control}
          defaultValue={getValues("content")}
          className="w-full mb-2"
        />
      </div>
      <div className="md:w-1/3 w-full mb-2 p-2">
        <Input
          label="Featured Image:"
          type="file"
          className="mb-4 bg-white rounded-md"
          accept="image/png,image/jpg,image/jpeg,image/gif"
          {...register("image", { required: !post })}
          onChange={handleFileInputChange}
        />

        {previewImg && (
          <div className="bg-white mb-2 p-2 rounded-md">
            <h2 className="font-semibold">Preview:</h2>
            <img className="h-32 mb-2 rounded" src={previewImg} alt="Preview" />
          </div>
        )}
        {post && (
          <div className="bg-white mb-2 p-2 rounded-md">
            <h2>Image:</h2>
            <img
              src={img}
              alt={post.title}
              className="mb-2 h-32 object-contain rounded"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-2"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full mt-2 border"
          disabled={isLoading}
        >
          {post
            ? isLoading
              ? "Updating...."
              : "Update"
            : isLoading
            ? "Submiting..."
            : "Submit"}
        </Button>
        {error}
      </div>
    </form>
  );
};

export default PostForm;
