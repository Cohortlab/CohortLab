"use client";
import React from "react";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";
import { Product } from "./Product";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function ProductSupport() {
  return (
  <LampContainer intensity="high">
      {/* children inside LampContainer are moved up by -translate-y-80 in the component; counter that here */}
      <div className="w-full flex justify-center translate-y-80 pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.3,
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          viewport={{ once: false, amount: 0.3 }}
          className="mt-100 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          
        </motion.h1>
      </div>

      <Product />
    </LampContainer>
  );
}
