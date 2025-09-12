"use client";
import React, { useState, useEffect } from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { motion } from "motion/react";

export function Hero1() {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowText(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="h-[60rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md relative">
      <h1
        className="md:text-7xl text-4xl lg:text-9xl font-bold text-center text-white relative z-20 px-4">
        COHORTLAB
      </h1>
      <div className="w-full max-w-[40rem] h-40 relative px-4">
        {/* Gradients */}
        <div
          className="absolute inset-x-4 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div
          className="absolute inset-x-4 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div
          className="absolute inset-x-16 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div
          className="absolute inset-x-16 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF" />

        {/* Radial Gradient to prevent sharp edges */}
        <div
          className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
      <motion.div
        animate={{ opacity: showText ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-8 md:bottom-34.5 right-4 text-xs md:text-sm text-slate-400 z-50 px-4 text-center md:text-right"
      >
        Please scroll down to know more...
      </motion.div>
    </div>
  );
}
