import type { Metadata } from "next";
import { Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  title: "Keziah Vickraman — Quantitative Poet",
  description:
    "Business Analyst · Teaching Assistant · MBAI Candidate · Handball Goalkeeper. Bridging rigorous mathematics and humanistic inquiry.",
  keywords: [
    "Keziah Vickraman",
    "Quantitative Finance",
    "Bayesian ML",
    "Sports Intelligence",
    "SMU",
    "Singapore",
  ],
  authors: [{ name: "Keziah Vickraman" }],
  openGraph: {
    title: "Keziah Vickraman — Quantitative Poet",
    description: "Bridging rigorous mathematics and humanistic inquiry.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jetbrains.variable}`}
    >
      <body>
        <Cursor />
        <Nav />
        {children}
      </body>
    </html>
  );
}
