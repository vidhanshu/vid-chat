import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import AuthProvider from "@/src/auth/context/auth.provider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./theme-provider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Private chat app one to one",
  description: "Private chat app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "dark:bg-zinc-950")}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <AuthProvider>{children}</AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
