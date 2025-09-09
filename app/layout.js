import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavbarMain } from "./ui/Navbar";
import { Floating } from "./ui/Floating";
import Image from "next/image";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavbarMain />
        {children}
        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center transition-opacity duration-300 opacity-60 hover:opacity-100">
          <Floating />
        </div>
        {/* Footer Content */}
        <footer>
          <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Image */}
            <div>
              <Image
                src="/3.png"
                alt="Footer Image"
                width={500}
                height={300}
                className="mb-4"
              />
              <p className="text-sm text-gray-400">
                All rights are reserved by CohortLab.
              </p>
            </div>
            {/* Product Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="text-gray-400 space-y-2">
                <li>job.CohortLab</li>
                <li>FreeLance.CohortLab</li>
                <li>Sync.CohortLab</li>
              </ul>
            </div>
            {/* Follow Us */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="text-gray-400 space-y-2">
                <li>X</li>
                <li>LinkedIn</li>
                <li>Mail</li>
                <li>Phone</li>
              </ul>
            </div>
            {/* Features & Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="text-gray-400 space-y-2">
                 <li>Website Design & Development</li>
                  <li>Website Translation / Localization</li>
                  <li>UI/UX Design</li>
                  <li>E-commerce Development</li>
                 
                  <li>CMS Development</li>
             
            
                  <li>Conversion Rate Optimization (CRO)</li>                 
                  <li>Brand Identity Design</li>
                  <li>AI Integrations</li>
                  <li>Mobile App Development</li>
         
              
                  <li>24/7 Technical Support and more...</li>
                              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}