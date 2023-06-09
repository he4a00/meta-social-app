import { type NextPage } from "next";
import Head from "next/head";
import PostsList from "./posts";
import { useSession } from "next-auth/react";
import LoginPage from "./login";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Social Media App </title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-[#15162c]">
        {sessionData ? <PostsList /> : <LoginPage />}
      </main>
    </>
  );
};

export default Home;
