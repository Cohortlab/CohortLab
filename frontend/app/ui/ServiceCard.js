"use client";
import React from "react";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";

import { WobbleCard } from "@/components/ui/wobble-card";

export function ServiceCard() {
  return (
    <LampContainer>
      <div className="relative z-10 mx-auto max-w-7xl py-16 mt-70">
        <div className="mt-20 mx-auto max-w-lg mb-10 py-2 text-2xl font-bold tracking-tight md:text-4xl">
            Our Portfolio.... <span>&amp;&amp;</span>
            <PointerHighlight>
              <span className="text-6xl">Consulting Services</span>
            </PointerHighlight> 
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            
            {/* Cards start */}
            <div className="col-span-3 flex items-center gap-2 mb-2">
              <span className="inline-block w-2 h-10 bg-gradient-to-b from-white via-neutral-400 to-white rounded-full"></span>
              <span className="text-3xl font-medium bg-gradient-to-r from-white via-neutral-400 to-white bg-clip-text text-transparent tracking-widest uppercase">Core Web Services</span>
            </div>
            <div className="group m-0 border border-gray-200 dark:border-gray-700 flex flex-col items-start max-w-sm p-6 relative h-[28rem] rounded-2xl shadow-lg bg-white/80 dark:bg-gray-800/80 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 text-blue-400 dark:text-blue-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-purple-400 dark:text-purple-300" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 text-blue-400 dark:text-blue-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-purple-400 dark:text-purple-300" />
              <EvervaultCard text="Website Design &amp; Development" />
              <h2 className="dark:text-white text-black mt-4 text-base font-semibold">We create modern, responsive, and high-performing websites tailored to your business goals.</h2>
            </div>
            <div className="group m-0 border border-gray-200 dark:border-gray-700 flex flex-col items-start max-w-sm p-6 relative h-[28rem] rounded-2xl shadow-lg bg-white/80 dark:bg-gray-800/80 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 text-blue-400 dark:text-blue-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-purple-400 dark:text-purple-300" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 text-blue-400 dark:text-blue-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-purple-400 dark:text-purple-300" />
              <EvervaultCard text="Website Translation/ Localization" />
              <h2 className="dark:text-white text-black mt-4 text-base font-semibold">Expand globally by making your website available in multiple languages with cultural accuracy.</h2>
            </div>
            <div className="group m-0 border border-gray-200 dark:border-gray-700 flex flex-col items-start max-w-sm p-6 relative h-[28rem] rounded-2xl shadow-lg bg-white/80 dark:bg-gray-800/80 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 text-blue-400 dark:text-blue-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-purple-400 dark:text-purple-300" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 text-blue-400 dark:text-blue-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-purple-400 dark:text-purple-300" />
              <EvervaultCard text="UI/UX Design" />
              <h2 className="dark:text-white text-black mt-4 text-base font-semibold">Clean, user-focused designs that enhance usability and keep visitors engaged.</h2>
            </div>
            <div className="group m-0 border border-gray-200 dark:border-gray-700 flex flex-col items-start max-w-sm p-6 relative h-[28rem] rounded-2xl shadow-lg bg-white/80 dark:bg-gray-800/80 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 text-blue-400 dark:text-blue-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 textPurple-400 dark:text-purple-300" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 text-blue-400 dark:text-blue-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 textPurple-400 dark:text-purple-300" />
              <EvervaultCard text="AI Integration and Automation with Custom Web-Apps" />
              <h2 className="dark:text-white text-black mt-4 text-base font-semibold">Scalable dashboards, portals, and SaaS applications built to solve your business needs.</h2>
            </div>
            <div className="group m-0 border border-gray-200 dark:border-gray-700 flex flex-col items-start max-w-sm p-6 relative h-[28rem] rounded-2xl shadow-lg bg-white/80 dark:bg-gray-800/80 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 text-blue-400 dark:text-blue-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 textPurple-400 dark:text-purple-300" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 text-blue-400 dark:text-blue-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 textPurple-400 dark:text-purple-300" />
              <EvervaultCard text="CMS Development" />
              <h2 className="dark:text-white text-black mt-4 text-base font-semibold">Easy-to-manage websites powered by WordPress, Webflow, or modern headless CMS platforms.</h2>
            </div>
            <div className="group m-0 border border-gray-200 dark:border-gray-700 flex flex-col items-start max-w-sm p-6 relative h-[28rem] rounded-2xl shadow-lg bg-white/80 dark:bg-gray-800/80 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 text-blue-400 dark:text-blue-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 textPurple-400 dark:text-purple-300" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 text-blue-400 dark:text-blue-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 textPurple-400 dark:text-purple-300" />
              <EvervaultCard text="Mobile Application" />
              <h2 className="dark:text-white text-black mt-4 text-base font-semibold">Easy-to-manage cross-platform Mobile Application
                with react-native.</h2>
            </div>

            <div className="col-span-3 flex items-center gap-2 mt-8 mb-2">
              <span className="inline-block w-2 h-10 bg-gradient-to-b from-white via-neutral-400 to-white rounded-full"></span>
              <span className="text-3xl font-medium bg-gradient-to-r from-white via-neutral-400 to-white bg-clip-text text-transparent tracking-widest uppercase">Digital Growth Services</span>
            </div>
            <div className="group m-0 border border-gray-200 dark:border-gray-700 flex flex-col items-start max-w-sm p-6 relative h-[28rem] rounded-2xl shadow-lg bg-white/80 dark:bg-gray-800/80 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 text-green-400 dark:text-green-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-blue-400 dark:text-blue-300" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 text-green-400 dark:text-green-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-blue-400 dark:text-blue-300" />
              <EvervaultCard text="SEO (Search Engine Optimization)" />
              <h2 className="dark:text-white text-black mt-4 text-base font-semibold">Optimize your website to rank higher on Google and attract organic traffic.</h2>
            </div>
            <div className="group m-0 border border-gray-200 dark:border-gray-700 flex flex-col items-start max-w-sm p-6 relative h-[28rem] rounded-2xl shadow-lg bg-white/80 dark:bg-gray-800/80 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 text-green-400 dark:text-green-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-blue-400 dark:text-blue-300" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 text-green-400 dark:text-green-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-blue-400 dark:text-blue-300" />
              <EvervaultCard text="Performance Optimization" />
              <h2 className="dark:text-white text-black mt-4 text-base font-semibold">Faster websites with improved Core Web Vitals for better user experience and rankings.</h2>
            </div>
            <div className="group m-0 border border-gray-200 dark:border-gray-700 flex flex-col items-start max-w-sm p-6 relative h-[28rem] rounded-2xl shadow-lg bg-white/80 dark:bg-gray-800/80 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 text-green-400 dark:text-green-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-blue-400 dark:text-blue-300" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 text-green-400 dark:text-green-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-blue-400 dark:text-blue-300" />
              <EvervaultCard text="Analytics Setup &amp; Tracking" />
              <h2 className="dark:text-white text-black mt-4 text-base font-semibold">Data-driven insights with tools like Google Analytics to measure and improve results.</h2>
            </div>

            <div className="col-span-3 flex items-center gap-2 mb-2 mt-10">
              <span className="inline-block w-2 h-10 bg-gradient-to-b from-white via-neutral-400 to-white rounded-full"></span>
              <span className="text-3xl font-medium bg-gradient-to-r from-white via-neutral-400 to-white bg-clip-text text-transparent tracking-widest uppercase">Marketing &amp; Branding</span>
            </div>
            <div className="group m-0 border border-gray-200 dark:border-gray-700 flex flex-col items-start max-w-sm p-6 relative h-[28rem] rounded-2xl shadow-lg bg-white/80 dark:bg-gray-800/80 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 text-pink-400 dark:text-pink-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-yellow-400 dark:text-yellow-300" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 text-pink-400 dark:text-pink-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-yellow-400 dark:text-yellow-300" />
              <EvervaultCard text="Social Media Management" />
              <h2 className="dark:text-white text-black mt-4 text-base font-semibold">Build your brand presence with consistent and engaging social media content.</h2>
            </div>
            <div className="group m-0 border border-gray-200 dark:border-gray-700 flex flex-col items-start max-w-sm p-6 relative h-[28rem] rounded-2xl shadow-lg bg-white/80 dark:bg-gray-800/80 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 text-pink-400 dark:text-pink-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-yellow-400 dark:text-yellow-300" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 text-pink-400 dark:text-pink-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-yellow-400 dark:text-yellow-300" />
              <EvervaultCard text="Paid Ads (Google, Meta, LinkedIn)" />
              <h2 className="dark:text-white text-black mt-4 text-base font-semibold">Targeted ad campaigns to reach the right audience and maximize ROI.</h2>
            </div>
            <div className="group m-0 border border-gray-200 dark:border-gray-700 flex flex-col items-start max-w-sm p-6 relative h-[28rem] rounded-2xl shadow-lg bg-white/80 dark:bg-gray-800/80 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 text-pink-400 dark:text-pink-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-yellow-400 dark:text-yellow-300" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 text-pink-400 dark:text-pink-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-yellow-400 dark:text-yellow-300" />
              <EvervaultCard text="Email Marketing" />
              <h2 className="dark:text-white text-black mt-4 text-base font-semibold">Automated and personalized campaigns that nurture leads and retain customers.</h2>
            </div>
            <div className="group m-0 border border-gray-200 dark:border-gray-700 flex flex-col items-start max-w-sm p-6 relative h-[28rem] rounded-2xl shadow-lg bg-white/80 dark:bg-gray-800/80 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 text-pink-400 dark:text-pink-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-yellow-400 dark:text-yellow-300" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 text-pink-400 dark:text-pink-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-yellow-400 dark:text-yellow-300" />
              <EvervaultCard text="Brand Identity Design" />
              <h2 className="dark:text-white text-black mt-4 text-base font-semibold">Complete branding solutions including logos, colors, and style guides to define your business.</h2>
            </div>

            <div className="col-span-3 flex items-center gap-2 mt-10 mb-2">
              <span className="inline-block w-2 h-10 bg-gradient-to-b from-white via-neutral-400 to-white rounded-full"></span>
              <span className="text-3xl font-medium bg-gradient-to-r from-white via-neutral-400 to-white bg-clip-text text-transparent tracking-widest uppercase">Advanced Tech Add-Ons</span>
            </div>
            <div className="group m-0 border border-gray-200 dark:border-gray-700 flex flex-col items-start max-w-sm p-6 relative h-[28rem] rounded-2xl shadow-lg bg-white/80 dark:bg-gray-800/80 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 text-indigo-400 dark:text-indigo-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-fuchsia-400 dark:text-fuchsia-300" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 text-indigo-400 dark:text-indigo-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-fuchsia-400 dark:text-fuchsia-300" />
              <EvervaultCard text="AI Integrations" />
              <h2 className="dark:text-white text-black mt-4 text-base font-semibold">Smart chatbots, automation, and AI assistants to improve efficiency and user experience.</h2>
            </div>
            <div className="group m-0 border border-gray-200 dark:border-gray-700 flex flex-col items-start max-w-sm p-6 relative h-[28rem] rounded-2xl shadow-lg bg-white/80 dark:bg-gray-800/80 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 text-indigo-400 dark:text-indigo-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-fuchsia-400 dark:text-fuchsia-300" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 text-indigo-400 dark:text-indigo-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-fuchsia-400 dark:text-fuchsia-300" />
              <EvervaultCard text="Mobile App Development" />
              <h2 className="dark:text-white text-black mt-4 text-base font-semibold">Cross Platform apps using React Native for seamless cross-platform experiences.</h2>
            </div>
            <div className="group m-0 border border-gray-200 dark:border-gray-700 flex flex-col items-start max-w-sm p-6 relative h-[28rem] rounded-2xl shadow-lg bg-white/80 dark:bg-gray-800/80 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 text-indigo-400 dark:text-indigo-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-fuchsia-400 dark:text-fuchsia-300" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 text-indigo-400 dark:text-indigo-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-fuchsia-400 dark:text-fuchsia-300" />
              <EvervaultCard text="Cloud Hosting &amp; DevOps" />
              <h2 className="dark:text-white text-black mt-4 text-base font-semibold">Scalable, secure hosting with automated deployment and monitoring.</h2>
            </div>

            <div className="col-span-3 flex items-center gap-2 mt-10 mb-2">
              <span className="inline-block w-2 h-10 bg-gradient-to-b from-white via-neutral-400 to-white rounded-full"></span>
              <span className="text-3xl font-medium bg-gradient-to-r from-white via-neutral-400 to-white bg-clip-text text-transparent tracking-widest uppercase">Maintenance &amp; Ongoing Support</span>
            </div>
            <div className="group m-0 border border-gray-200 dark:border-gray-700 flex flex-col items-start max-w-sm p-6 relative h-[28rem] rounded-2xl shadow-lg bg-white/80 dark:bg-gray-800/80 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 text-gray-400 dark:text-gray-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-gray-700 dark:text-gray-500" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 text-gray-400 dark:text-gray-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-gray-700 dark:text-gray-500" />
              <EvervaultCard text="Website Maintenance Plans" />
              <h2 className="dark:text-white text-black mt-4 text-base font-semibold">Regular updates, backups, and fixes to keep your site running smoothly.</h2>
            </div>
            <div className="group m-0 border border-gray-200 dark:border-gray-700 flex flex-col items-start max-w-sm p-6 relative h-[28rem] rounded-2xl shadow-lg bg-white/80 dark:bg-gray-800/80 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 text-gray-400 dark:text-gray-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-gray-700 dark:text-gray-500" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 text-gray-400 dark:text-gray-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-gray-700 dark:text-gray-500" />
              <EvervaultCard text="Security &amp; Compliance" />
              <h2 className="dark:text-white text-black mt-4 text-base font-semibold">SSL, GDPR readiness, and penetration testing for complete online safety.</h2>
            </div>
            <div className="group m-0 border border-gray-200 dark:border-gray-700 flex flex-col items-start max-w-sm p-6 relative h-[28rem] rounded-2xl shadow-lg bg-white/80 dark:bg-gray-800/80 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 text-gray-400 dark:text-gray-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-gray-700 dark:text-gray-500" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 text-gray-400 dark:text-gray-300" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-gray-700 dark:text-gray-500" />
              <EvervaultCard text="24/7 Technical Support" />
              <h2 className="dark:text-white text-black mt-4 text-base font-semibold">Always-on support to solve issues whenever you need us.</h2>
            </div>
            
            {/* Cards end */}
          </div>
        </div>
    </LampContainer>
  );
}
