import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dbService from "../appwrite/conf";
import { Button, Container } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      dbService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    dbService.deletePost(post.$id).then((status) => {
      if (status) {
        dbService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-10 sm:py-14">
      <Container>
        <article className="mx-auto max-w-3xl">
          <div className="mb-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-(--accent)">
              Story
            </p>

            <h1 className="editorial-serif text-4xl sm:text-5xl font-semibold leading-tight tracking-[-0.03em] text-(--ink)">
              {post.title}
            </h1>
          </div>

          <div className="relative mb-10 overflow-hidden rounded-md border border-(--line)">
            <img
              src={dbService.filePreview(post.featuredImage)}
              alt={post.title}
              className="w-full object-cover"
            />

            {isAuthor && (
              <div className="absolute right-4 top-4 flex gap-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-[var(--accent)]" className="text-sm">
                    Edit
                  </Button>
                </Link>

                <Button
                  bgColor="bg-red-600"
                  className="text-sm"
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          <div className="article-body">{parse(post.content)}</div>
        </article>
      </Container>
    </div>
  ) : null;
}
