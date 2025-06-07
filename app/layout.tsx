import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InstaTravel",
  description: "Discover trendy accommodations curated by influencers and book your next socially-driven getaway on InstaTravel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://hjsbwsdjwoipcwadbjvy.supabase.co" />
        <link rel="preconnect" href="https://a0.muscache.com" />
        <link rel="dns-prefetch" href="https://hjsbwsdjwoipcwadbjvy.supabase.co" />
        <link rel="dns-prefetch" href="https://a0.muscache.com" />
        <link rel="dns-prefetch" href="https://static.vecteezy.com" />
      </head>      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
