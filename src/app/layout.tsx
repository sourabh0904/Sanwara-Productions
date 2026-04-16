import type { Metadata } from "next";
import { Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/PageLoader";
import FloatingActions from "@/components/FloatingActions";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sanwara Productions | Luxury Event Films",
  description:
    "Crafting Stories Through Every Frame. Premium event videography for weddings, corporate events, and celebrations in Indore.",
  keywords: ["wedding videography", "event films", "Sanwara Productions", "Indore", "cinematic"],
  openGraph: {
    title: "Sanwara Productions | Luxury Event Films",
    description: "Premium event videography — weddings, corporate, celebrations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} ${cormorant.variable} antialiased scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://lh3.googleusercontent.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://lh3.googleusercontent.com" />
        <link rel="dns-prefetch" href="https://drive.google.com" />
      </head>
      <body className="min-h-full flex flex-col selection:bg-gold selection:text-black bg-[#0B0B0B]">
        <PageLoader />
        <FloatingActions />
        {children}
      </body>
    </html>
  );
}
