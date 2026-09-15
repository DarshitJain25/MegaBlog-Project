import React from "react";
import dbService from "../appwrite/conf";
import { Link } from "react-router-dom";
function PostCard({ $id, title, featuredImage }) {
  // console.log("featuredImage: ", featuredImage);

  const imageUrl = dbService.filePreview(featuredImage);

  console.log("imageUrl:", imageUrl);

  return (
    <Link to={`/post/${$id}`} className="group block h-full">
      <div className="h-full overflow-hidden rounded-md border border-(--line) bg-(--surface) transition-colors duration-200 hover:border-(--accent)">
        <div className="aspect-16/10 w-full overflow-hidden bg-(--line)">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>

        <div className="p-5 sm:p-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-(--accent)">
            Story
          </p>

          <h2 className="editorial-serif text-xl sm:text-2xl font-semibold leading-snug tracking-[-0.02em] text-(--ink) transition-colors duration-200 group-hover:text-(--accent)">
            {title}
          </h2>

          <p className="mt-4 text-sm font-medium text-(--muted)">
            Read story →
          </p>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
