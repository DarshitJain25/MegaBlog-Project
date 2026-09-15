import React, { useState, useEffect } from "react";
import dbService from "../appwrite/conf";
import { Container, PostCard } from "../components/index";
function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    dbService
      .getPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <div className="w-full py-12 sm:py-16">
      <Container>
        <section className="mb-10 border-b border-(--line) pb-8 sm:pb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-(--accent)">
            Archive
          </p>

          <h1 className="editorial-serif text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-(--ink)">
            All stories
          </h1>

          <p className="mt-4 max-w-2xl text-(--muted)">
            Browse every published story from MegaBlog.
          </p>
        </section>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
