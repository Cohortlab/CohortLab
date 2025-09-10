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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} cz-shortcut-listen="true">
       
          {/* Navbar */}
          <NavbarMain />

          <main>{children}</main>

          <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center transition-opacity duration-300 opacity-60 hover:opacity-100">
            <Floating />
          </div>

          <Footer />
        
      </body>
    </html>
  );
}
