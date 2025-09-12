// components/Footer.jsx
import React from "react";
import Image from "next/image";
import { Meteors } from "@/components/ui/meteors";

export default function Footer() {
  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Meteor background effect */}
      <div className="absolute inset-0 h-full w-full scale-[0.95] transform rounded-2xl bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl opacity-40 pointer-events-none" />
      <footer className="mt-16 z-20 relative flex flex-col items-start justify-end overflow-hidden rounded-2xl border border-gray-800 bg-black/70 backdrop-blur-sm px-4 py-8 shadow-xl">
        {/* Meteor animation */}
        <Meteors number={20} />
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
          {/* Logo and Image */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/3.png"
              alt="CohortLab logo"
              width={500}
              height={300}
              className="mb-4 max-w-[180px] sm:max-w-[220px] h-auto"
            />
            <p className="text-xs sm:text-sm text-gray-400">
              All rights are reserved by CohortLab.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Product</h3>
            <ul className="text-gray-400 space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li>job.CohortLab</li>
              <li>FreeLance.CohortLab</li>
              <li>Sync.CohortLab</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Contact Us</h3>
            <ul className="text-gray-400 space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li>X</li>
              <li>LinkedIn</li>
              <li>Mail</li>
              <li>Phone</li>
            </ul>
          </div>

          {/* Features */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Features</h3>
            <ul className="text-gray-400 space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li>Website Design &amp; Development</li>
              <li>Website Translation / Localization</li>
              <li>UI/UX Design</li>
              <li>E-commerce Development</li>
              <li>CMS Development</li>
              <li>Conversion Rate Optimization (CRO)</li>
              <li>Brand Identity Design</li>
              <li>AI Integrations and Automations</li>
              <li>Mobile App Development</li>
              <li>24/7 Technical Support and more...</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
