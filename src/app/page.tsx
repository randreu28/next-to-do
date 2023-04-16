import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

import type { Database } from "@/lib/db.types";
import { redirect } from "next/navigation";
import Link from "next/link";
import NavBar from "@/component/NavBar";

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

  const { data: todos, error } = await supabase.from("todos").select();

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="space-y-5 p-5">
      <NavBar email={session.user.email} />

      <h1 className="text-3xl">To do&apos;s: </h1>
      {todos.map((todo, key) => {
        return (
          <li className={todo.is_completed ? "line-through" : ""} key={key}>
            <Link href={"/" + todo.id} className="hover:underline">
              {todo.title}
            </Link>
          </li>
        );
      })}
    </div>
  );
}
