"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

export function Project1() {
  return (
    <div className="flex flex-col overflow-hidden">
      {/* Large boxed title like Services page, but for Sync AI */}
      <div className="mx-auto max-w-lg mb-10 py-2 text-2xl font-bold tracking-tight md:text-4xl text-center">
        <div className="mb-2">Sync AI</div>
        <PointerHighlight>
          <span className="text-6xl md:text-7xl lg:text-[6rem] font-extrabold">Sync AI</span>
        </PointerHighlight>
      </div>

      <ContainerScroll>
        <img
          src='/sync.png'
          alt="hero"
          className="mx-auto rounded-2xl object-cover w-full h-auto max-w-full object-left-top"
          draggable={false} />
      </ContainerScroll>
    </div>
  );
}
