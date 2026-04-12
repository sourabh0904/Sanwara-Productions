import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/PageLoader";
import FloatingActions from "@/components/FloatingActions";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
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
    <html lang="en" className={`${outfit.variable} antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col selection:bg-gold selection:text-black bg-[#0B0B0B]">
        <PageLoader />
        <FloatingActions />
        {children}
      </body>
    </html>
  );
}
