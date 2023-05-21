import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { api } from "y/utils/api";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";

const PostsList: NextPage = () => {
  const { data: sessionData } = useSession();

  const { data } = api.posts.getAllPosts.useQuery();
  const [postContent, setPostContent] = useState("");
  const ctx = api.useContext();
  const { mutate } = api.posts.createPost.useMutation({
    onSuccess: () => {
      setPostContent("");
      void ctx.posts.getAllPosts.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        alert(errorMessage);
      }
    },
  });

  return (
    <>
      <div>
        <input
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          type="text"
        />
        <button
          className=" m-4 rounded bg-white p-4"
          onClick={() => mutate({ content: postContent })}
        >
          Post
        </button>
      </div>
      <div>
        {sessionData &&
          data?.map((post) => {
            return (
              <div className="text-white" key={post?.id}>
                {post?.content}
                <Link href={`/user/${post?.author?.name || ""}`}>
                  {post?.author?.name}
                </Link>
                <Image
                  src={post?.author?.image || "/default-image.jpg"}
                  alt="author image"
                  width={50}
                  height={50}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PostsList;
