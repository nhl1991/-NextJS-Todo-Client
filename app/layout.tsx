import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/provider/AuthContext";
import Navigation from "@/components/common/components/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todolist",
  description: "Simple Todolist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <div className=" flex flex-col gap-4 min-h-screen w-screen items-center bg-zinc-200 font-sans dark:bg-black md:min-w-2xl py-10">
            <Navigation />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html >
  );
}
