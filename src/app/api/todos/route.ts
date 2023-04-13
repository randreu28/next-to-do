import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { z } from "zod";

import type { Database } from "@/lib/db.types";

export const revalidate = 0;

export async function GET() {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });

  const { data } = await supabase.from("todos").select("*");

  return new Response(JSON.stringify(data));
}

export async function POST(req: Request) {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });

  const todoSchema = z.object({
    isCompleted: z.boolean().optional(),
    title: z.string(),
  });

  const data = await req.json();

  try {
    todoSchema.parse(data);
    const newTodo = data as z.infer<typeof todoSchema>;

    const { error } = await supabase.from("todos").insert({ ...newTodo });

    if (error) {
      return new Response(JSON.stringify({ error: "Database error" }), {
        status: 400,
      });
    }
  } catch {
    return new Response(JSON.stringify({ error: "Invalid schema" }), {
      status: 400,
    });
  }

  return new Response(JSON.stringify({ message: "OK" }));
}
