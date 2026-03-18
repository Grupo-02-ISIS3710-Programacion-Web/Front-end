import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar";
import { Toaster } from "@/components/ui/sonner";
import { NextIntlClientProvider } from 'next-intl';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skin4All",
  description: "Crea tu rutina de cuidado de la piel.",
  icons: {
    icon: "/skin4all_logo.svg",
    shortcut: "/skin4all_logo.svg",
    apple: "/skin4all_logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <NextIntlClientProvider >
          <NavBar />
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

