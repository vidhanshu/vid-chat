import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import SocketProvider from "@/src/common/context/socket/socket.provider";
import AuthProvider from "@/src/auth/context/auth.provider";
import { Toaster } from "@/components/ui/toaster";

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
      <body className={inter.className}>
        <AuthProvider>
          <SocketProvider>{children}</SocketProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
