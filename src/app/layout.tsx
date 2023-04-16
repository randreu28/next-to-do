import "./globals.css";
import SupabaseProvider from "@/components/SupabaseProvider";

export const metadata = {
  title: "Next Todo App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SupabaseProvider>{children}</SupabaseProvider>
      </body>
    </html>
  );
}
