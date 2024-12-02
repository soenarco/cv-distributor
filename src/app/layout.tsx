import type { Metadata } from "next";
import "./globals.css";
import HeaderMenu from "./component/headerMenu";

export const metadata: Metadata = {
  title: "CV Distributor Aufa Fahira",
  description: "Aplikasi CV Distributor Aufa Fahira Developed By Sunarko",
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
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-100">
        {/* Header */}
        {/* <HeaderMenu /> */}

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-white py-6 text-center text-xs text-gray-500">
          <p>&copy; {currentYear} CV Distributor Aufa Fahira. Developed by <strong>Sunarko</strong></p>
        </footer>
      </body>
    </html>
  );
};
