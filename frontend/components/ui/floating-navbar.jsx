"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const FloatingNav = ({
  navItems,
  className
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true); // Start visible

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();

      if (scrollYProgress.get() < 0.05) {
        setVisible(true); // Always show at the top
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <>
      <style jsx>{`
        @keyframes liquidFlow {
          0%, 100% { transform: scale(0.8) rotate(0deg) skew(5deg); opacity: 0.4; }
          50% { transform: scale(1.3) rotate(180deg) skew(-5deg); opacity: 0.7; }
        }
        .liquid-hover-nav {
          position: relative;
          overflow: hidden;
          border-radius: 0.75rem;
          padding: 0.5rem 0.75rem;
        }
        .liquid-hover-nav::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: radial-gradient(ellipse 120% 80% at center, rgba(20, 184, 166, 0.6) 0%, rgba(6, 182, 212, 0.5) 30%, rgba(14, 165, 233, 0.3) 60%, transparent 80%);
          border-radius: inherit;
          filter: blur(6px);
          transform: scale(0);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: -1;
        }
        .liquid-hover-nav:hover::before,
        .liquid-hover-nav.active::before {
          transform: scale(1.4);
          animation: liquidFlow 2s infinite ease-in-out;
        }
        .liquid-hover-nav:hover,
        .liquid-hover-nav.active {
          transform: translateY(-1px);
          transition: transform 0.2s ease;
        }
      `}</style>
      <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-background bg-background shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-4 sm:pl-8 py-2 items-center justify-center space-x-2 sm:space-x-4",
          className
        )}>

          <button
          className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-2 sm:px-4 py-2 rounded-full bg-background">
          <span> 
            <Image src="/5.png" alt="Login" width={16} height={16} />
          </span>
          <span
            className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </button>
        {navItems.map((navItem, idx) => (
          <a
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 liquid-hover-nav px-2 py-1",
              navItem.isActive && "active"
            )}>
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-xs md:text-sm">{navItem.name}</span>
          </a>
        ))}
        
      </motion.div>
    </AnimatePresence>
    </>
  );
};
