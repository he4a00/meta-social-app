import { api } from "y/utils/api";
import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import PostInput from "y/components/PostInput";
import Image from "next/image";
import Link from "next/link";

const PostsList: NextPage = () => {
  const { data: sessionData } = useSession();
  const { data } = api.posts.getAllPosts.useQuery();

  return (
    <>
      <div>
        <button onClick={() => void signOut()} className="text-white">
          Log Out
        </button>
        <PostInput />
      </div>
      <div className="w-[38.4rem] border">
        {sessionData &&
          data?.map((post) => {
            return (
              <div className="text-white" key={post?.id}>
                <div className="m-5 flex  items-center border-b-2 p-5">
                  <Image
                    alt="author Image"
                    src={post?.author?.image || ""}
                    width={50}
                    height={50}
                    className="mr-1 rounded-full"
                  />

                  <div className="ml-3">
                    <Link
                      href={`/users/${post.author.name || ""}`}
                      className="font-bold"
                    >
                      {post?.author.name}
                    </Link>
                    <p>{post?.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PostsList;
