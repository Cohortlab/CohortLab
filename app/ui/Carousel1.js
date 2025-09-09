"use client";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import Carousel from "@/components/ui/carousel";
import "../globals.css";

import React from "react";

export function Carousel1() {
  const slideData = [
    {
      title: "Mystic Mountains",
      button: "Explore Component",
      src: "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Urban Dreams",
      button: "Explore Component",
      src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Neon Nights",
      button: "Explore Component",
      src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Desert Whispers",
      button: "Explore Component",
      src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <div>
      <div className="mt-20 mx-auto max-w-lg mb-10 py-2 text-4xl font-bold tracking-tight md:text-6xl">
        Experiences.... <span>&amp;&amp;</span>
        <PointerHighlight>
          <span>Projects</span>
        </PointerHighlight>
      </div>

      {/* Counter Section */}
      <div className="flex flex-wrap justify-center gap-8 py-8 border-1 border-dashed border-gray-200">
        {[
          { value: "2+", label: "Years of Experience" },
          { value: "10+", label: "Organizations Served" },
          { value: "5+", label: "Countries Served" },
          { value: "15+", label: "Successful Projects" },
        ].map((item, index) => (
          <div
            key={index}
            className="notebook-card flex flex-col items-center p-6 w-64 transition-transform duration-300 hover:scale-105"
          >
            <span className="text-4xl font-extrabold text-gray-600">{item.value}</span>
      <span className="text-base text-gray-700 mt-2 text-center">{item.label}</span>
          </div>
        ))}
      </div>


      <div className="relative overflow-hidden w-full h-full py-20">
        <Carousel slides={slideData} />
      </div>
    </div>
  );
}
