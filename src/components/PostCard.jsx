import React from "react";
import dbService from "../appwrite/conf";
import { Link } from "react-router-dom";
function PostCard({ $id, title, featuredImage }) {
  // console.log("featuredImage: ", featuredImage);

  const imageUrl = dbService.filePreview(featuredImage);

  console.log("imageUrl:", imageUrl);

  return (
    <Link to={`/post/${$id}`}>
      <div className = "w-full bg-slate-500 rounded-xl p-4">
        <div className="w-full justify-center mb-4 h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
