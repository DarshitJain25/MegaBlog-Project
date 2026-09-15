import React, { useState, useEffect } from "react";
import dbService from "../appwrite/conf";
import { Container, PostCard } from "../components/index";
function Home() {
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

  if (posts.length === 0)
    return (
      <Container>
        <div className="py-20 sm:py-28 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-(--accent)">
            MegaBlog
          </p>

          <h1 className="editorial-serif text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-(--ink)">
            Stories worth slowing down for.
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-(--muted)">
            Login to discover thoughtful stories, ideas and perspectives.
          </p>
        </div>
      </Container>
    );
  return (
    <div className="w-full py-12 sm:py-16">
      <Container>
        <section className="max-w-3xl border-b border-(--line) pb-10 sm:pb-14">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-(--accent)">
            Independent writing
          </p>

          <h1 className="editorial-serif text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-[-0.04em] text-var(--ink)">
            Ideas, stories and perspectives worth reading.
          </h1>

          <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-(--muted)">
            A space for thoughtful writing, personal stories and ideas from
            curious minds.
          </p>
        </section>

        <section className="pt-10 sm:pt-12">
          <div className="mb-7 flex items-end justify-between border-b border-(--line) pb-4">
            <h2 className="editorial-serif text-2xl sm:text-3xl font-semibold text-(--ink)">
              Latest stories
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div key={post.$id}>
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}

export default Home;
