import type { Metadata } from "next";
import Link from "next/link";
import { Home, Users, Settings, MapPinned, Tv, Radio } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Socket App",
  description: "Next.js App with Socket.io and Redux",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-gray-50 text-gray-900 font-sans antialiased min-h-screen flex flex-col">
        <nav className="hidden md:block bg-blue-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex gap-6">
            <Link
              href="/"
              className="hover:text-blue-200 transition font-medium"
            >
              خانه
            </Link>
            <Link
              href="/teams"
              className="hover:text-blue-200 transition font-medium"
            >
              تیم‌ها
            </Link>

            <Link
              href="/settings"
              className="hover:text-blue-200 transition font-medium"
            >
              تنظیمات
            </Link>
          </div>
        </nav>
        <header className="md:hidden bg-white border-b border-gray-100 p-4 sticky top-0 z-40 flex items-center justify-between">
          <span className="font-bold text-gray-900 text-lg">My Socket App</span>
        </header>

        <main className="container mx-auto sm:p-6 flex-1 pb-24 md:pb-8">
          {children}
        </main>

        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg safe-bottom">
          <div className="flex items-center justify-around py-2">
            <Link
              href="/"
              className="flex flex-col items-center justify-center flex-1 py-1 text-gray-600 hover:text-blue-600 transition"
            >
              <Users className="w-5 h-5 mb-0.5" />
            </Link>

            <Link
              href="/show"
              className="flex flex-col items-center justify-center flex-1 py-1 text-gray-600 hover:text-blue-600 transition"
            >
              <Tv className="w-5 h-5 mb-0.5" />
            </Link>
            <Link
              href="/organs"
              className="flex flex-col items-center justify-center flex-1 py-1 text-gray-600 hover:text-blue-600 transition"
            >
              <MapPinned className="w-5 h-5 mb-0.5" />
            </Link>
            <Link
              href="/leaders"
              className="flex flex-col items-center justify-center flex-1 py-1 text-gray-600 hover:text-blue-600 transition"
            >
              <Radio className="w-5 h-5 mb-0.5" />
            </Link>
            <Link
              href="/settings"
              className="flex flex-col items-center justify-center flex-1 py-1 text-gray-600 hover:text-blue-600 transition"
            >
              <Settings className="w-5 h-5 mb-0.5" />
            </Link>
          </div>
        </nav>
      </body>
    </html>
  );
}
