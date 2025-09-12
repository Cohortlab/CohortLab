import Image from "next/image";
import { Hero1 } from "./ui/Hero1";
import { Hero2 } from "./ui/Hero2";
import { Hero3 } from "./ui/Hero3";
import { Carousel1 } from "./ui/Carousel1";
import { ServiceCard } from "./ui/ServiceCard";
import { Testimonials } from "./ui/Testimonial";
import { Testimonial2 } from "./ui/Testimonial2";
import Why from "./ui/Why";
import Agile from "./ui/Agile";

import { ContactButton } from "./ui/ContactButton";
import { Services2Support } from "./ui/Services2/Services2Support";
export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <Hero1 />
      <Hero2 />
      <Hero3 />
      <Carousel1 />
      {/* <ServiceCard /> */}
      <Services2Support />
      <Agile />
      <div className="flex flex-col items-center justify-center mt-10 sm:mt-16 md:mt-20 mb-6 sm:mb-10 px-4">
        <Testimonials />
        <Testimonial2 />
      </div>
      
      <Why />
      <ContactButton />
      
    </div>
  );
}
