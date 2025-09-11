import React from "react";
import Image from "next/image";
import { Meteors } from "@/components/ui/meteors";
import Link from "next/link";

export default function FounderInfo() {
  const founders = [
    {
      name: "Rishi Ranjan",
      role: "Co-founder",
      company: "CohortLab",
      experience: "2+ years experience",
      portfolio: "https://rishiranjan.vercel.app/",
      github: "https://github.com/RiH-137",
      linkedin: "https://www.linkedin.com/in/rishi-rih/",
      email: "101rishidsr@gmail.com",
      avatar: "/founder1.png", 
    },
    {
      name: "Aditya Ranjan",
      role: "Co-founder",
      company: "CohortLab",
      experience: "2+ years experience",
      portfolio: null,
      github: "https://github.com/adityaranjan2005",
      linkedin: null,
      email: null,
      avatar: "/5.jpg",
    },
  ];

  return (
    <div className="relative w-full max-w-7xl mx-auto mb-16">
      {/* Background effect similar to Footer */}
      <div className="absolute inset-0 h-full w-full scale-[0.95] transform rounded-2xl bg-gradient-to-r from-blue-500 to-[#010618]-500 blur-3xl opacity-40 pointer-events-none" />
      
      <div className="mt-16 z-20 relative flex flex-col items-start justify-end overflow-hidden rounded-2xl border border-gray-800 bg-black/70 backdrop-blur-sm px-4 py-8 shadow-xl">
        {/* Meteor animation */}
        <Meteors number={20} />
        
        <div className="container mx-auto px-6 py-10 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Who Started It All
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The creative force powering CohortLab’s journey toward digital excellence.
            </p>
          </div>

          {/* Founders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {founders.map((founder, index) => (
              <div
                key={index}
                className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 hover:bg-gray-900/70 transition-all duration-300 hover:scale-105"
              >
                {/* Avatar placeholder */}
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-[#010618]-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {founder.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>

                {/* Founder Info */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {founder.name}
                  </h3>
                  <p className="text-blue-400 mb-1">
                    {founder.role}, {founder.company}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {founder.experience}
                  </p>
                </div>

                {/* Links */}
                <div className="space-y-3">
                  {founder.portfolio && (
                    <Link
                      href={founder.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-[#010618]-600 text-white rounded-lg hover:from-blue-700 hover:to-[#010618]-700 transition-all duration-200"
                    >
                      Portfolio
                    </Link>
                  )}
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href={founder.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center py-2 px-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-200"
                    >
                      GitHub
                    </Link>
                    
                    {founder.linkedin && (
                      <Link
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200"
                      >
                        LinkedIn
                      </Link>
                    )}
                  </div>

                  {founder.email && (
                    <Link
                      href={`mailto:${founder.email}`}
                      className="flex items-center justify-center w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200"
                    >
                      {founder.email}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="text-center mt-12">
            <p className="text-gray-400">
              Want to connect with our founders? Feel free to reach out through any of the platforms above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
