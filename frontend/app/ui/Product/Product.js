"use client";
import React from "react";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";
import { Project1 } from "./Project/Project1";
import { Project2 } from "./Project/Project2";
import { Project3 } from "./Project/Project3";
import { Project4 } from "./Project/Project4";
import { Project5 } from "./Project/Project5";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
export function Product() {
  return (
    <div>
      <Project1 />
      <Project2 />
      <Project3 />
      <Project4 />
      <Project5 />

      <div className="h-[30rem] sm:h-[40rem] flex flex-col items-center justify-center px-4">
        <TextHoverEffect text="COHORT" />
        <TextHoverEffect text="LAB" />
      </div>
    </div>
  );
}
