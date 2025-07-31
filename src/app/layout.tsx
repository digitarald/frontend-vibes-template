import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Model Context Protocol - Join the Growing Ecosystem",
  description: "Join the thriving MCP ecosystem with 1000+ servers, 212+ contributors, and 70+ compatible clients. Build, share, and discover powerful Model Context Protocol implementations.",
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
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
