"use client";

import { useSupabase } from "@/components/SupabaseProvider";
import Link from "next/link";

export default function Auth() {
  const { supabase } = useSupabase();

  function googleSignIn() {
    /* .... */
  }

  function githubSignIn() {
    /* .... */
  }

  return (
    <>
      <span className="flex gap-5">
        <span className="p-2 bg-gray-800 rounded-xl my-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
        </span>
        <h1 className="my-auto text-2xl">Next To Do</h1>
      </span>
      <p className="text-gray-400">Sign in to see and manage all your todos</p>

      <div className="w-full flex gap-5">
        <button
          onClick={googleSignIn}
          className="bg-gray-600 p-3 rounded w-full text-center"
        >
          Google
        </button>
        <button
          onClick={githubSignIn}
          className="bg-gray-600 p-3 rounded w-full text-center"
        >
          Github
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <label className="my-auto text-gray-400 font-bold">Email Address</label>
        <input type="email" className="p-2" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="my-auto text-gray-400 font-bold">Password</label>
        <input type="password" className="p-2" />
      </div>

      <button type="submit" className="w-full bg-gray-600 p-3 rounded">
        Sign in
      </button>

      <div className="flex flex-col gap-2 text-gray-400 underline text-sm text-center">
        <Link href={"/recover-password"}>Forgot your password?</Link>
        <Link href={"/sign-up"}>Don&apos;t have an account? Sign up</Link>
      </div>
    </>
  );
}
