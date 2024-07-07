import type { Metadata } from "next";
import { NextTamaguiProvider } from "../providers/TamaguiProvider";
import { Inter } from "next/font/google";
import "./globals.css";
import { Layout } from "./_components/Thing";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sorry, my dog is agressively friendly",
  description: "Musings of brooklyn man with his doodle, poodle...noodle",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextTamaguiProvider>
          <Layout>{children}</Layout>
        </NextTamaguiProvider>
      </body>
    </html>
  );
}
