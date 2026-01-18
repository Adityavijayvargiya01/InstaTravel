import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap", // Faster font loading with FOUT instead of FOIT
  preload: true,
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: {
    default: "InstaTravel - Book Trending Accommodations",
    template: "%s | InstaTravel",
  },
  description: "Discover trendy accommodations curated by influencers and book your next socially-driven getaway on InstaTravel.",
  keywords: ["travel", "accommodations", "vacation", "booking", "hotels", "rentals"],
  authors: [{ name: "InstaTravel" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "InstaTravel",
    title: "InstaTravel - Book Trending Accommodations",
    description: "Discover trendy accommodations curated by influencers and book your next socially-driven getaway.",
  },
  twitter: {
    card: "summary_large_image",
    title: "InstaTravel - Book Trending Accommodations",
    description: "Discover trendy accommodations curated by influencers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://hjsbwsdjwoipcwadbjvy.supabase.co" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://a0.muscache.com" crossOrigin="anonymous" />
        {/* DNS prefetch for less critical origins */}
        <link rel="dns-prefetch" href="https://hjsbwsdjwoipcwadbjvy.supabase.co" />
        <link rel="dns-prefetch" href="https://a0.muscache.com" />
        <link rel="dns-prefetch" href="https://static.vecteezy.com" />
        <link rel="dns-prefetch" href="https://lh3.googleusercontent.com" />
        {/* Preload critical assets */}
        <link rel="preload" as="image" href="/InstaTravel-desktop.png" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
