// app/layout.jsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavbarMain } from "./ui/Navbar";
import { Floating } from "./ui/Floating";
import Footer from "./ui/Footer"; 
import { ThemeProvider } from 'next-themes'

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
    <html ang="en" suppressHydrationWarning className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`} cz-shortcut-listen="true">
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
          {/* Navbar */}
          <NavbarMain />

          <main className="relative">{children}</main>

          {/* Mobile-responsive floating dock - hidden on small screens when navbar actions are visible */}
          <div className="fixed left-2 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center transition-opacity duration-300 opacity-60 hover:opacity-100 sm:left-4 lg:opacity-60 lg:hover:opacity-100">
            <Floating />
          </div>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
