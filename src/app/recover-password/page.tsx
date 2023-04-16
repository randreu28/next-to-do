"use client";

import { useSupabase } from "@/components/SupabaseProvider";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { getURL } from "@/lib/utils";

type FormValues = {
  email: string;
};

export default function RecoverPassword() {
  const { supabase } = useSupabase();
  const { register, handleSubmit } = useForm<FormValues>();
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  async function emailSignIn({ email }: FormValues) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: getURL("recover-password/reset"),
    });

    if (error) {
      setError(error.message);
    } else {
      setConfirmation("Email sent succesfully!");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(emailSignIn)}
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
      <p className="text-gray-400">
        Give us your email and we will send you a recovery email!
      </p>

      <div className="flex flex-col gap-2">
        <label className="my-auto text-gray-400 font-bold">Email Address</label>
        <input {...register("email")} type="email" required className="p-2" />
      </div>

      {error && (
        <p className="bg-red-500/25 p-1 rounded text-red-500">{error}</p>
      )}

      {confirmation && (
        <p className="bg-green-500/25 p-1 rounded text-green-500">
          {confirmation}
        </p>
      )}

      <button type="submit" className="w-full bg-gray-600 p-3 rounded">
        Send recovery email
      </button>

      <div className="flex flex-col gap-2 text-gray-400 underline text-sm text-center">
        <Link href={"/recover-password"}>Forgot your password?</Link>
        <Link href={"/sign-up"}>Don&apos;t have an account? Sign up</Link>
      </div>
    </form>
  );
}
