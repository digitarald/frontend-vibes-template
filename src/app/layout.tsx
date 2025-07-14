import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/layout/header";

export const metadata: Metadata = {
  title: "MCP Servers - Enterprise Model Context Protocol Solutions",
  description: "Transform your AI development with enterprise-grade Model Context Protocol servers. Standardized integration, enhanced security, and rapid deployment for modern software teams.",
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
