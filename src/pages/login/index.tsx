import React from "react";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4">
        <button
          className=" font-bold text-white"
          onClick={() => void signIn("google")}
        >
          Sign In
        </button>
      </div>
    </>
  );
};

export default LoginPage;
