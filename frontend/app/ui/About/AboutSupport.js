"use client";
import React from "react";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";
import About from "./About";


export function AboutSupport() {
  return (
    <div className="w-full overflow-x-hidden bg-background">
      <LampContainer className="min-h-screen">
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-4 sm:mt-6 md:mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-2 sm:py-4 bg-clip-text text-center text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-medium tracking-tight text-transparent px-2 sm:px-4">
          About Us
        </motion.h1>
        <div className="mt-6 sm:mt-8 md:mt-12 lg:mt-16 w-full max-w-none px-2 sm:px-4">
          <About />
        </div>
      </LampContainer>
    </div>
  );
}
