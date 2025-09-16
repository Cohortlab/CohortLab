"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function Project2() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[6rem] font-bold mt-1 leading-none mb-12 sm:mb-16 lg:mb-20 px-4 text-center">
              AppleDesk - AI RAG Powered<br />
              <span className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black dark:text-white">
                ....
              </span>
            </h1>
          </>
        }>
        <img
          src='/apple.png'
          alt="hero"
          className="mx-auto rounded-2xl object-cover w-full h-auto max-w-full object-left-top"
          draggable={false} />
      </ContainerScroll>
    </div>
  );
}
