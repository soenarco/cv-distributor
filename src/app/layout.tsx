import type { Metadata } from "next";
import "./globals.css";

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
      <body>
        {children}
      </body>
    </html>
  );
};
