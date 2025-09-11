"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React, { useState, useEffect } from "react";

export const Meteors = ({
  number,
  className
}) => {
  const [isClient, setIsClient] = useState(false);
  const meteors = new Array(number || 20).fill(true);
  
  // Generate deterministic delay and duration based on index
  const getAnimationDelay = (index) => {
    const delays = [0, 0.8, 1.6, 2.4, 3.2, 4.0, 0.4, 1.2, 2.0, 2.8, 3.6, 4.4, 0.2, 1.0, 1.8, 2.6, 3.4, 4.2, 0.6, 1.4];
    return delays[index % delays.length];
  };
  
  const getAnimationDuration = (index) => {
    const durations = [7, 8, 6, 9, 7.5, 8.5, 6.5, 9.5, 7.2, 8.2, 6.8, 9.2, 7.8, 8.8, 6.2, 9.8, 7.1, 8.1, 6.9, 9.1];
    return durations[index % durations.length];
  };

  // Ensure we only render animations on the client side after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render animations until after hydration to prevent mismatch
  if (!isClient) {
    return <div className="relative"></div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}>
      {meteors.map((el, idx) => {
        const meteorCount = number || 20;
        // Calculate position to evenly distribute meteors across container width
        const position = idx * (800 / meteorCount) - 400; // Spread across 800px range, centered

        return (
          <span
            key={"meteor" + idx}
            className={cn(
              "animate-meteor-effect absolute h-0.5 w-0.5 rotate-[45deg] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
              "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
              className
            )}
            style={{
              top: "-40px", // Start above the container
              left: position + "px",
              animationDelay: getAnimationDelay(idx) + "s",
              animationDuration: getAnimationDuration(idx) + "s",
            }}></span>
        );
      })}
    </motion.div>
  );
};
