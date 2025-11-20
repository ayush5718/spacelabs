import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "800"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "SpaceLab Creative Studios - Science + Tech Brands",
  description: "The Creative Studio for Science + Tech Brands. Making the Complex Compelling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="lenis">
      <body
        className={`${inter.variable} ${spaceMono.variable} bg-boulder-black text-white font-sans antialiased selection:bg-white selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}
