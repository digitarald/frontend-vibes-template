import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "PADI Quiz Pro",
  description: "Gamified daily quiz for PADI Open Water certification prep",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased min-h-screen bg-background"
      >
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 py-6 px-6 md:px-8 lg:px-10">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
