import type { Metadata } from "next";
import { Faustina } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/header";

const faustina = Faustina({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Princeton Tiger",
  description: "Princeton's Home of Humor since 1882",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${faustina.className} min-h-full flex flex-col`}>
        <Navbar />
        <main className="flex-1 w-full max-w-[90%] lg:max-w-[80%] mx-auto pt-1 lg:pt-3 pb-5">
          {children}
        </main>
      </body>
    </html>
  );
}
