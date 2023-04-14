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

  const schema = z.object({
    isCompleted: z.boolean().optional(),
    title: z.string(),
  });

  const data = await req.json();

  try {
    schema.parse(data);
    const newTodo = data as z.infer<typeof schema>;

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

export async function PUT(req: Request) {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });

  const schema = z.object({
    id: z.number(),
    isCompleted: z.boolean().optional(),
    title: z.string().optional(),
  });

  const data = await req.json();

  try {
    schema.parse(data);
    const newTodo = data as z.infer<typeof schema>;

    const { error } = await supabase
      .from("todos")
      .update({ ...newTodo })
      .eq("id", newTodo.id);

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

export async function DELETE(req: Request) {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });

  const schema = z.object({
    id: z.number(),
  });

  const data = await req.json();

  try {
    schema.parse(data);
    const newTodo = data as z.infer<typeof schema>;

    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", newTodo.id);

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
