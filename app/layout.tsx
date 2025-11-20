import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpaceLabs Creative Studios - Science + Tech Brands",
  description: "The Creative Studio for Science + Tech Brands. Making the Complex Compelling.",
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="lenis">
      <body className="bg-boulder-black text-white font-sans antialiased selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
