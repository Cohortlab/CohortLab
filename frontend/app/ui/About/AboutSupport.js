"use client";
import React from "react";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";
import About from "./About";


export function AboutSupport() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-medium tracking-tight text-transparent px-4">
       
      </motion.h1>
      <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-32">
        <About />
      </div>
    </LampContainer>
  );
}
