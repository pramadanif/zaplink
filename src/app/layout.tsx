import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "Zaplink | B2B SaaS Infrastructure for Micro-Escrow",
  description: "Secure, instant, and frictionless digital payments powered by Starkzap Commerce Kit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-zap-bg text-white selection:bg-zap-orange selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
