// app/layout.jsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavbarMain } from "./ui/Navbar";
import { Floating } from "./ui/Floating";
import Footer from "./ui/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CohortLab",
  description: "Complete Web Solutions for Your Business",
  icons: {
    icon: "/5.png",
    shortcut: "/5.png",
    apple: "/5.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" style={{colorScheme: 'dark'}} suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark only" />
        <script dangerouslySetInnerHTML={{
          __html: `
            // Force dark mode immediately
            (function() {
              document.documentElement.classList.add('dark');
              document.documentElement.style.colorScheme = 'dark';
            })();
          `
        }} />
        <style dangerouslySetInnerHTML={{
          __html: `
            :root { color-scheme: dark only !important; }
            html { color-scheme: dark only !important; }
            body { color-scheme: dark only !important; }
          `
        }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen dark`} cz-shortcut-listen="true">
          {/* Navbar */}
          <NavbarMain />

          <main className="relative">{children}</main>

          {/* Mobile-responsive floating dock - hidden on small screens when navbar actions are visible */}
          <div className="fixed left-2 top-1/2 -translate-y-1/2 z-[60] flex flex-col items-center transition-opacity duration-300 opacity-90 hover:opacity-100 sm:left-4 lg:opacity-70 lg:hover:opacity-100">
            <Floating />
          </div>

          <Footer />
      </body>
    </html>
  );
}
