import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zaplink | Liquid Utility • Starknet Native",
  description: "Experience liquid utility and seamless interactions on Starknet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-zap-bg text-white selection:bg-zap-orange selection:text-white">
        {children}
      </body>
    </html>
  );
}
