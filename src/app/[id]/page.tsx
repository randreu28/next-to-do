import { Database } from "@/lib/db.types";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function Todo({ params: { id: _id } }: Props) {
  const id = parseInt(_id);

  if (isNaN(id)) {
    notFound();
  }

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

  const { data, error } = await supabase.from("todos").select().eq("id", id);

  if (error) {
    notFound();
  }
  const todo = data[0];

  if (todo === undefined) {
    notFound();
  }

  return (
    <>
      <p>{todo.title}</p>
      <Link href="/" className="underline">
        Go back
      </Link>
    </>
  );
}
