import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

import type { Database } from "@/lib/db.types";
import { redirect } from "next/navigation";

import TodoCreator from "@/components/TodoCreator";
import Todos from "@/components/Todos";

export const revalidate = 0;

export default async function App() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="space-y-5 p-5">
      <h1 className="text-3xl">To do&apos;s: </h1>
      <TodoCreator />
      <Todos />
    </div>
  );
}
