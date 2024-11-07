import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

if (process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  console.error = (...args) => {
    if (args[0] && args[0].includes('Hydration failed')) {
      return;
    }
    originalError(...args);
  };
}

export const metadata: Metadata = {
  title: "CV Distributor Aufa Fahira",
  description: "Aplikasi Distributor Developed By Sunarko",
  themeColor: "#000000",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon-sosro.svg",      
    apple: "/icon-sosro.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
