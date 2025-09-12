"use client";
import React from "react";
import { Vortex } from "@/components/ui/vortex";

export function ContactButton() {
  return (
    <div
      className="w-[calc(100%-1rem)] md:w-[calc(100%-4rem)] mx-auto rounded-md h-[30rem] overflow-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-4 md:px-10 py-4 w-full h-full">
        <h2 className="text-white text-xl md:text-4xl lg:text-6xl font-bold text-center">
          Want To Work Together?
        </h2>
        <p className="text-white text-sm md:text-lg lg:text-2xl max-w-xl mt-4 md:mt-6 text-center px-2">
          Let&apos;s build something great together and make your vision a reality with our expertise and your business goals.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 md:mt-6 w-full max-w-md">
          <button
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset] text-sm md:text-base font-medium min-h-[44px]">
            Get Free consultancy
          </button>
          <button className="w-full sm:w-auto px-6 py-3 text-white border border-white/20 rounded-lg hover:bg-white/10 transition duration-200 text-sm md:text-base font-medium min-h-[44px]">Contact Us</button>
        </div>
      </Vortex>
    </div>
  );
}
