import NavBar from "@/components/NavBar";
import "./globals.css";
import SupabaseProvider from "@/components/SupabaseProvider";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/db.types";
import { cookies, headers } from "next/headers";

export const metadata = {
  title: "Next Todo App",
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body>
        <SupabaseProvider>
          {session && <NavBar email={session.user.email} />}
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}
