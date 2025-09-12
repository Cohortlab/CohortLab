"use client";
import React from "react";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";
import { Blog } from "./Blog";
export function BlogSupport() {
  return (
    <div className="w-full overflow-x-hidden">
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-2xl md:text-4xl lg:text-7xl font-medium tracking-tight text-transparent px-4">
        
      </motion.h1><div className="mt-4 md:mt-10 w-full"><Blog /></div>
    </LampContainer>
    </div>
  );
}
