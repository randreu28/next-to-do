import { Database } from "@/lib/db.types";
import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

export const revalidate = 0;

export async function GET(req: Request) {
  const id = parseInt(req.url.slice(req.url.lastIndexOf("/") + 1));

  /* Validation */
  if (isNaN(id)) {
    return new Response(JSON.stringify({ error: "ID must be a number" }), {
      status: 400,
    });
  }

  /* Data selection */
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });

  const { data, error, status, statusText } = await supabase
    .from("todos")
    .select()
    .eq("id", id);

  if (error) {
    return new Response(JSON.stringify(error), {
      status: status,
      statusText: statusText,
    });
  }

  return new Response(JSON.stringify(data));
}
