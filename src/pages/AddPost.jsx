import React from "react";
import { Container, PostForm } from "../components/index.js";
function AddPost() {
  return (
   <div className="py-10 sm:py-14">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
