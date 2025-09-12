import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,IconMail,
  IconExchange,
  IconHome,IconStar,
  IconNewSection,IconPhoneDone,
  IconTerminal2,
} from "@tabler/icons-react";
import { SiLinkedin } from "react-icons/si";

export function Floating() {
  const links = [
    {
      title: "Get Free Consultancy",
      icon: (
        <IconStar stroke={2} className="h-full w-full text-white" />
      ),
      href: "/call#consultancy",
    },

    {
      title: "Book a Call",
      icon: (
        <IconPhoneDone stroke={2} className="h-full w-full text-white" />
      ),
      href: "/call#book-call",
    },
    {
      title: "Services",
      icon: (
        <IconNewSection className="h-full w-full text-white" />
      ),
      href: "/services",
    },
    {
      title: "Home",
      icon: (
        <img
          src="/5.png"
          width={20}
          height={20}
          alt="Home" />
      ),
      href: "/",
    },
    {
      title: "Mail Us",
      icon: (
        <IconMail stroke={2} className="h-full w-full text-white" />
      ),
      href: "mailto:101rishidsr@gmail.com",
    },
    

    {
      title: "LinkedIn",
      icon: (
        <SiLinkedin  className="h-full w-full text-white" />
      ),
      href: "https://www.linkedin.com/company/cohortlab/",
    },
    {
      title: "Want to Contribute or Report Issues?",
      icon: (
        <IconBrandGithub className="h-full w-full text-white" />
      ),
      href: "https://github.com/Cohortlab/CohortLab",
    },
  ];
  return (
    <div className="flex items-center justify-center h-[20rem] md:h-[35rem] w-full">
      <FloatingDock
        // Mobile optimized positioning
        mobileClassName="translate-x-8 md:translate-x-20"
        items={links} />
    </div>
  );
}
