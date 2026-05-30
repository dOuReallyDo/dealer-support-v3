import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dealer Support v3",
  description: "Multi-operatore configuratore offerte — WindTre, TIM, Vodafone, Fastweb, iliad",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}