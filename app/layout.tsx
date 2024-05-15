import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Music Streaming Service",
  description: "Listen to the BEST song!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Sidebar>
        {children}
        </Sidebar>
      </body>
    </html>
  );
}
