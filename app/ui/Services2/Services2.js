"use client";
import {
  Box,
  Lock,
  Search,
  Settings,
  Sparkles,
  Globe,
  Smartphone,
  Cpu,
  Cloud,
  Shield,
  LifeBuoy,
  Mail,
  BarChart,
} from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

export function Services2() {
  return (
    <div className="space-y-16 px-4 max-w-7xl mx-auto">
      {/* ---------------- CORE WEB SERVICES ---------------- */}
      <section>
        <div className="mx-auto max-w-lg mb-10 py-2 text-2xl font-bold tracking-tight md:text-4xl text-center">
          Core
          <PointerHighlight>
            <span className="text-6xl">Web Services</span>
          </PointerHighlight> 
        </div>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-6">
          <GridItem
            area="md:[grid-area:1/1/2/7]"
            icon={<Box className="h-5 w-5 text-black dark:text-neutral-400" />}
            title="Website Design & Development"
            description="We create modern, responsive, and high-performing websites tailored to your business goals."
          />
          <GridItem
            area="md:[grid-area:1/7/2/13]"
            icon={<Globe className="h-5 w-5 text-black dark:text-neutral-400" />}
            title="Website Translation / Localization"
            description="Expand globally by making your website available in multiple languages with cultural accuracy."
          />
          <GridItem
            area="md:[grid-area:2/1/4/5]"
            icon={<Sparkles className="h-5 w-5 text-black dark:text-neutral-400" />}
            title="UI/UX Design"
            description="Clean, user-focused designs that enhance usability and keep visitors engaged."
          />
          <GridItem
            area="md:[grid-area:2/5/3/9]"
            icon={<Settings className="h-5 w-5 text-black dark:text-neutral-400" />}
            title="Custom Web Apps"
            description="Scalable dashboards, portals, and SaaS applications built to solve your business needs."
          />
          <GridItem
            area="md:[grid-area:2/9/3/13]"
            icon={<Search className="h-5 w-5 text-black dark:text-neutral-400" />}
            title="CMS Development"
            description="Easy-to-manage websites powered by WordPress, Webflow, or modern headless CMS platforms."
          />
          <GridItem
            area="md:[grid-area:3/5/4/13]"
            icon={<Smartphone className="h-5 w-5 text-black dark:text-neutral-400" />}
            title="Mobile Application"
            description="Cross-platform mobile apps built with React Native for maximum reach and efficiency."
          />
        </ul>
      </section>

      {/* ---------------- DIGITAL GROWTH ---------------- */}
      <section>
        <div className="mx-auto max-w-lg mb-10 py-2 text-2xl font-bold tracking-tight md:text-4xl text-center">
          Digital
          <PointerHighlight>
            <span className="text-6xl">Growth Services</span>
          </PointerHighlight> 
        </div>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-2 lg:gap-6">
          <GridItem
            area="md:[grid-area:1/1/2/7]"
            icon={<BarChart className="h-5 w-5 text-black dark:text-neutral-400" />}
            title="SEO (Search Engine Optimization)"
            description="Optimize your website to rank higher on Google and attract organic traffic."
          />
          <GridItem
            area="md:[grid-area:1/7/2/13]"
            icon={<Sparkles className="h-5 w-5 text-black dark:text-neutral-400" />}
            title="Performance Optimization"
            description="Faster websites with improved Core Web Vitals for better user experience and rankings."
          />
          <GridItem
            area="md:[grid-area:2/1/3/13]"
            icon={<Settings className="h-5 w-5 text-black dark:text-neutral-400" />}
            title="Analytics Setup & Tracking"
            description="Data-driven insights with tools like Google Analytics to measure and improve results."
          />
        </ul>
      </section>

      {/* ---------------- MARKETING & BRANDING ---------------- */}
      <section>
        <div className="mx-auto max-w-lg mb-10 py-2 text-2xl font-bold tracking-tight md:text-4xl text-center">
          Marketing &
          <PointerHighlight>
            <span className="text-6xl">Branding</span>
          </PointerHighlight> 
        </div>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-2 lg:gap-6">
          <GridItem
            area="md:[grid-area:1/1/2/4]"
            icon={<Sparkles className="h-5 w-5 text-black dark:text-neutral-400" />}
            title="Social Media Management"
            description="Build your brand presence with consistent and engaging social media content."
          />
          <GridItem
            area="md:[grid-area:1/4/2/8]"
            icon={<Box className="h-5 w-5 text-black dark:text-neutral-400" />}
            title="Paid Ads (Google, Meta, LinkedIn)"
            description="Targeted ad campaigns to reach the right audience and maximize ROI."
          />
          <GridItem
            area="md:[grid-area:1/8/2/13]"
            icon={<Mail className="h-5 w-5 text-black dark:text-neutral-400" />}
            title="Email Marketing"
            description="Automated and personalized campaigns that nurture leads and retain customers."
          />
          <GridItem
            area="md:[grid-area:2/1/3/7]"
            icon={<Lock className="h-5 w-5 text-black dark:text-neutral-400" />}
            title="Brand Identity Design"
            description="Complete branding solutions including logos, colors, and style guides to define your business."
          />
        </ul>
      </section>

      {/* ---------------- ADVANCED TECH ---------------- */}
      <section>
        <div className="mx-auto max-w-lg mb-10 py-2 text-2xl font-bold tracking-tight md:text-4xl text-center">
          Advanced
          <PointerHighlight>
            <span className="text-6xl">Tech Add-Ons</span>
          </PointerHighlight> 
        </div>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-2 lg:gap-6">
          <GridItem
            area="md:[grid-area:1/1/2/7]"
            icon={<Cpu className="h-5 w-5 text-black dark:text-neutral-400" />}
            title="AI Integrations"
            description="Smart chatbots, automation, and AI assistants to improve efficiency and user experience."
          />
          <GridItem
            area="md:[grid-area:1/7/2/13]"
            icon={<Smartphone className="h-5 w-5 text-black dark:text-neutral-400" />}
            title="Mobile App Development"
            description="Cross-platform apps using React Native for seamless experiences."
          />
          <GridItem
            area="md:[grid-area:2/1/3/13]"
            icon={<Cloud className="h-5 w-5 text-black dark:text-neutral-400" />}
            title="Cloud Hosting & DevOps"
            description="Scalable, secure hosting with automated deployment and monitoring."
          />
        </ul>
      </section>

      {/* ---------------- MAINTENANCE & SUPPORT ---------------- */}
      <section>
        <div className="mx-auto max-w-lg mb-10 py-2 text-2xl font-bold tracking-tight md:text-4xl text-center">
          Maintenance &
          <PointerHighlight>
            <span className="text-6xl">Ongoing Support</span>
          </PointerHighlight> 
        </div>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-1 lg:gap-6">
          <GridItem
            area="md:[grid-area:1/1/2/5]"
            icon={<Settings className="h-5 w-5 text-black dark:text-neutral-400" />}
            title="Website Maintenance Plans"
            description="Regular updates, backups, and fixes to keep your site running smoothly."
          />
          <GridItem
            area="md:[grid-area:1/5/2/9]"
            icon={<Shield className="h-5 w-5 text-black dark:text-neutral-400" />}
            title="Security & Compliance"
            description="SSL, GDPR readiness, and penetration testing for complete online safety."
          />
          <GridItem
            area="md:[grid-area:1/9/2/13]"
            icon={<LifeBuoy className="h-5 w-5 text-black dark:text-neutral-400" />}
            title="24/7 Technical Support"
            description="Always-on support to solve issues whenever you need us."
          />
        </ul>
      </section>
    </div>
  );
}

const GridItem = ({ area, icon, title, description }) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">{icon}</div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl font-semibold text-black md:text-2xl dark:text-white">
                {title}
              </h3>
              <h2 className="font-sans text-sm text-black md:text-base dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
