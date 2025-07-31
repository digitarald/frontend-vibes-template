import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header";

export const metadata: Metadata = {
  title: "MCP Enterprise - AI Infrastructure Platform",
  description: "Standardize your enterprise AI infrastructure with Model Context Protocol. Secure, scalable, and vendor lock-in free.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background font-sans">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
