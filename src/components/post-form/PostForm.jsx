import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, SelectButton } from "..";
import { useDispatch } from "react-redux";
import dbService from "../../appwrite/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    // console.log("This is the submit function",data);
    // console.log("Submit button", data);
    if (post) {
      const file = data.image[0]
        ? await dbService.uploadFile(data.image[0])
        : null;
      // console.log("1. File uploaded:", file);

      if (file) {
        dbService.deleteFile(post.featuredImage);
      }
      // console.log("2. File deleted:", file);
      const dbPost = await dbService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      // console.log("3. Post updated:", dbPost);
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await dbService.uploadFile(data.image[0]);
      // console.log("1. File uploaded:", file);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await dbService.createPost({
          ...data,
          userId: userData.$id,
        });
        // console.log("1. Post created:", dbPost);
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="w-full">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-(--accent)">
              Story details
            </p>

            <h1 className="editorial-serif text-3xl font-semibold tracking-[-0.03em] text-(--ink)">
              {post ? "Edit your story" : "Write a new story"}
            </h1>

            <p className="mt-2 text-sm text-(--muted)">
              Give your story a title and start writing below.
            </p>
          </div>

          <div className="border-t border-(--line) pt-6">
            <Input
              label="Title :"
              placeholder="Title"
              {...register("title", {
                required: true,
              })}
            />
          </div>

          <Input
            label="Slug :"
            placeholder="Slug"
            {...register("slug", {
              required: true,
            })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />

          <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>

        {/* RIGHT SIDE */}
        <aside className="space-y-5">
          <div className="rounded-md border border-(--line) bg-(--surface) p-5">
            <h2 className="editorial-serif mb-4 text-xl font-semibold text-(--ink)">
              Featured image
            </h2>

            <Input
              label="Featured Image :"
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", {
                required: !post,
              })}
            />

            {post && (
              <div className="mt-4 w-full overflow-hidden rounded-md border border-(--line)">
                <img
                  src={dbService.filePreview(post.featuredImage)}
                  alt={post.title}
                  className="w-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="rounded-md border border-(--line) bg-(--surface) p-5">
            <h2 className="editorial-serif mb-4 text-xl font-semibold text-(--ink)">
              Publishing
            </h2>

            <SelectButton
              options={["active", "inactive"]}
              label="Status"
              {...register("status", {
                required: true,
              })}
            />
          </div>

          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className="w-full"
          >
            {post ? "Update" : "Submit"}
          </Button>
        </aside>
      </div>
    </form>
  );
}

export default PostForm;
