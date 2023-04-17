"use client";

import { useSupabase } from "@/components/SupabaseProvider";

type Props = {
  email: string | undefined;
};

export default function NavBar({ email }: Props) {
  const { supabase } = useSupabase();

  function signOut() {
    supabase.auth.signOut();
  }
  return (
    <div className="float-right p-5">
      <p>Signed in as {email}</p>
      <button className="underline float-right" onClick={signOut}>
        Sign out
      </button>
    </div>
  );
}
