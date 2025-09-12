"use client";
import React, { useEffect } from "react";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";
import { ContactSupport } from "../ui/Contact/ContactSupport";

export default function JoinPage() {
  // Handle smooth scrolling to section based on hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 500); // Small delay to ensure content is rendered
      }
    };

    // Handle initial hash on page load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-medium tracking-tight text-transparent px-4"
        >
          Start. A. Project.
        </motion.h1>
      </LampContainer>
      <ContactSupport />
    </div>
  );
}
