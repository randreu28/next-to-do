"use client";

import { useSupabase } from "@/components/SupabaseProvider";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  password: string;
  password2: string;
};

export default function SignIn() {
  const { supabase } = useSupabase();

  const { register, handleSubmit } = useForm<FormValues>();
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  async function resetPassword(formValues: FormValues) {
    if (formValues.password !== formValues.password2) {
      setConfirmation(null);
      setError("Passwords don't match");
      return;
    }
    const { error } = await supabase.auth.updateUser(formValues);

    if (error) {
      setConfirmation(null);
      setError(error.message);
    } else {
      setError(null);
      setConfirmation("Password changed succesfully!");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(resetPassword)}
      className="bg-gray-900 p-5 rounded w-full max-w-xl space-y-5"
    >
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
      <p className="text-gray-400">Please, type in a new password</p>

      <div className="flex flex-col gap-2">
        <label className="my-auto text-gray-400 font-bold">Password</label>
        <input
          {...register("password")}
          type="password"
          required
          className="p-2"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="my-auto text-gray-400 font-bold">Password</label>
        <input
          {...register("password2")}
          type="password"
          required
          className="p-2"
        />
      </div>

      {error && (
        <p className="bg-red-500/25 p-1 rounded text-red-500">{error}</p>
      )}

      {confirmation && (
        <>
          <p className="bg-green-500/25 p-1 rounded text-green-500">
            {confirmation}
          </p>
          <Link
            href="/sign-in"
            className="underline text-center text-gray-500 w-full float-left"
          >
            Sign in
          </Link>
        </>
      )}

      <button type="submit" className="w-full bg-gray-600 p-3 rounded">
        Reset password
      </button>

      <div className="flex flex-col gap-2 text-gray-400 underline text-sm text-center">
        <Link href={"/sign-up"}>Don&apos;t have an account? Sign up</Link>
      </div>
    </form>
  );
}
