"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import Link from "next/link";
export function NavbarMain() {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Services",
      link: "/services",
    },
    {
      name: "Products",
      link: "/products",
    },
    {
      name: "Blog",
      link: "/blog",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Join Us",  
      link: "/join",
    },
    {
      name: "Contact Us",
      link: "/call",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full mt-5">
      <Navbar className="bg-blur-md">
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          {/* Desktop Nav Items with Link */}
          <div className="flex gap-6">
            {navItems.map((item, idx) => (
              <Link key={item.name} href={item.link} className="text-neutral-800 dark:text-neutral-200 hover:text-blue-500 transition-colors font-medium">
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4 border-4 p-2 rounded-xl">
            <NavbarButton variant="secondary">Get Free Consultancy</NavbarButton>
            <NavbarButton variant="primary">Book a call</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300 block py-2 px-4 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4 border">
              
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full">
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      <Content />
    </div>
  );
}

const Content = () => {
  return (
    <div> </div>
  );
};
