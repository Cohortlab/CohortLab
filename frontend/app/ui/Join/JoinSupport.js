"use client";
import React from "react";
import { motion } from "motion/react";
import Join from "./Join";

export function JoinSupport() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 py-12">
      <div className="container mx-auto px-4">
        <Join />
      </div>
    </div>
  );
}
