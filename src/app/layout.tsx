import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "Zaplink | B2B SaaS Infrastructure for Micro-Escrow",
  description: "Secure, instant, and frictionless digital payments powered by Starkzap Commerce Kit.",
  openGraph: {
    title: "Zaplink | B2B SaaS",
    description: "End the hostage phase. Trustless micro-escrow for digital creators.",
    url: "https://zaplink.xyz",
    siteName: "ZapLink",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaplink | End the hostage phase.",
    description: "Instant micro-escrow for creators on Starknet.",
    images: ["/og-image.png"],
    creator: "@Starknet",
  },
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
