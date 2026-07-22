import "./globals.css";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SEOHead } from "@/components/SEOHead";

export const metadata: Metadata = {
  title: "PDCYES – Personal Development Community in Playa del Carmen",
  description:
    "Community events, workshops, and gatherings focused on personal growth.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SEOHead />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}