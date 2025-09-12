"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { 
  IconHome, 
  IconSettings, 
  IconShoppingBag, 
  IconNews, 
  IconUser, 
  IconUsers, 
  IconPhone,
  IconStar,
  IconCalendar 
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavbarMain() {
  const pathname = usePathname();
  
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Services",
      link: "/services",
      icon: <IconSettings className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Products", 
      link: "/products",
      icon: <IconShoppingBag className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Blog",
      link: "/blog", 
      icon: <IconNews className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: " About Us",
      link: "/about",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Join Us",
      link: "/join",
      icon: <IconUsers className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact Us",
      link: "/call",
      icon: <IconPhone className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    
  ];

  // Add active property to nav items
  const navItemsWithActive = navItems.map(item => ({
    ...item,
    isActive: pathname === item.link
  }));

  return (
    <div className="relative w-full">
      <style jsx>{`
        @keyframes liquidPulse {
          0%, 100% { transform: scale(0.8) rotate(0deg); opacity: 0.6; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
        }
        .liquid-hover {
          position: relative;
          overflow: hidden;
        }
        .liquid-hover::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, rgba(20, 184, 166, 0.6) 0%, rgba(6, 182, 212, 0.4) 50%, transparent 70%);
          border-radius: 50%;
          filter: blur(8px);
          transform: scale(0);
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: -1;
        }
        .liquid-hover:hover::before {
          transform: scale(1.5);
          animation: liquidPulse 1.5s infinite ease-in-out;
        }
      `}</style>
      <FloatingNav navItems={navItemsWithActive} />
      <FloatingActionButtons />
    </div>
  );
}

const FloatingActionButtons = () => {
  return (
    <div className="fixed top-4 right-4 z-[5000] flex items-center gap-2">
      <Link
        href="/call#consultancy"
        className="
          hidden sm:flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-2 
          bg-[#022E44] dark:bg-[#010618]
          border border-neutral-200 dark:border-neutral-700 
          rounded-full text-xs lg:text-sm font-medium
          text-neutral-600 dark:text-neutral-300
          hover:bg-[#010618] dark:hover:bg-[#010618]
          transition-all duration-200
          backdrop-blur-md liquid-hover
        "
      >
        <IconStar className="h-3 w-3 lg:h-4 lg:w-4" />
        <span className="hidden md:inline">Get Free Consultancy</span>
        <span className="md:hidden">Consultancy</span>
      </Link>
      <Link
        href="/call#book-call"
        className="
          flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-2
          bg-[#022E44] hover:bg-[#010618]
          text-white rounded-full text-xs lg:text-sm font-medium
          transition-all duration-200
          backdrop-blur-md liquid-hover
        "
      >
        <IconCalendar className="h-3 w-3 lg:h-4 lg:w-4" />
        <span className="hidden sm:inline">Book a call</span>
        <span className="sm:hidden">Call</span>
      </Link>
    </div>
  );
};
