// RootLayout
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Runiverse",
  description: "Runiverse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="max-w-[600px] mx-auto my-0 bg-gray-50 h-full">{children}</body>
    </html>
  );
}
