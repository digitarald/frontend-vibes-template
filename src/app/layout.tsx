import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header";

export const metadata: Metadata = {
  title: "MCP - Stop Building AI Integrations From Scratch",
  description: "Model Context Protocol simplifies AI integrations with standardized connections, reducing maintenance overhead and vendor lock-in.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased min-h-screen bg-background font-sans"
      >
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 py-6 px-6 md:px-8 lg:px-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
