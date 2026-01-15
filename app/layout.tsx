import type { Metadata } from "next";
import { Quicksand, Fredoka } from "next/font/google";
import "./globals.css";
import FloatingPaws from "./components/FloatingPaws";
import MouseTrailPaws from "./components/MouseTrailPaws";
import SkipToMain from "./components/SkipToMain";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Cats Family - Meet Our Feline Squad",
  description:
    "Welcome to our playful cat family website! Meet Whiskers, Luna, Shadow and their adorable family members.",
  keywords: "cats, feline, cat family, pet adoption, cat care",
  authors: [{ name: "Feline Squad" }],
  openGraph: {
    title: "Cats Family - Meet Our Feline Squad",
    description: "Welcome to our playful cat family website!",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} ${fredoka.variable} antialiased`}>
        <SkipToMain />
        <FloatingPaws />
        <MouseTrailPaws />
        {children}
      </body>
    </html>
  );
}
