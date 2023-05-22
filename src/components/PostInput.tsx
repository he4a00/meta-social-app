import Image from "next/image";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { api } from "y/utils/api";

const PostInput = () => {
  const { data: sessionData } = useSession();
  const [postContent, setPostContent] = useState("");
  const ctx = api.useContext();
  const { mutate, isLoading } = api.posts.createPost.useMutation({
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
    <div className="">
      <div className="flex gap-x-16 border p-7">
        {sessionData ? (
          <Image
            className="rounded-full"
            src={sessionData?.user.image || "/default-image.jpg"}
            alt="author image"
            width={80}
            height={80}
          />
        ) : (
          <button onClick={() => void signIn("google")} className="text-white">
            Sign In
          </button>
        )}

        <input
          className="bg-transparent p-7 text-white outline-none"
          placeholder="What Is Happening?"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          type="text"
        />
        {sessionData && (
          <button
            className={`m-4 w-20 rounded-lg bg-indigo-500 p-2 text-white ${
              isLoading || postContent.length === 0 ? "bg-indigo-100" : ""
            }`}
            onClick={() => mutate({ content: postContent })}
            disabled={isLoading || postContent.length === 0}
          >
            Tweet
          </button>
        )}
      </div>
    </div>
  );
};

export default PostInput;
