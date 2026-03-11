import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GPM Educational Academy | Excellence in Education",
  description: "A prestigious institution empowering students to excel academically, grow personally, and contribute positively to our global society.",
  keywords: ["school", "education", "academy", "high school", "gpm academy", "admissions", "excellence", "international"],
  openGraph: {
    title: "GPM Educational Academy",
    description: "A prestigious institution empowering students to excel academically and grow personally.",
    url: "https://gpmeducationalacademy.edu",
    siteName: "GPM Academy",
    images: [
      {
        url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "GPM Educational Academy Campus",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GPM Educational Academy",
    description: "Empowering students to excel academically, grow personally, and contribute positively to our global society.",
    images: ["https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
