import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";

import type { Database } from "@/lib/db.types";

export const revalidate = 0;

export async function GET() {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });

  const { data } = await supabase.from("todos").select("*");

  return NextResponse.json(data);
}
