
"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
export function Project1() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-1xl sm:text-2xl md:text-3xl lg:text-[4rem] font-bold mt-1 leading-none mb-12 sm:mb-16 lg:mb-20 px-4 text-center">
              <PointerHighlight>
                <span className="text-6xl md:text-7xl lg:text-[6rem] font-extrabold">Sync AI</span>
              </PointerHighlight>AI Resume Builder<br />
              <span className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black dark:text-white">
                ....
              </span>
            </h1>
          </>
        }>
       <img
          src='/sync.png'
          alt="hero"
          className="mx-auto rounded-2xl object-cover w-full h-auto max-w-full object-left-top"
          draggable={false} />
      </ContainerScroll>
    </div>
  );
}
