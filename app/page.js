import Image from "next/image";
import { Hero1 } from "./ui/Hero1";
import { Hero2 } from "./ui/Hero2";
import { Hero3 } from "./ui/Hero3";
import { Carousel1 } from "./ui/Carousel1";
import { ServiceCard } from "./ui/ServiceCard";
import { Testimonials } from "./ui/Testimonial";
import Why from "./ui/Why";
import Agile from "./ui/Agile";

import { ContactButton } from "./ui/ContactButton";
export default function Home() {
  return (
    <div>
      <Hero1 />
      <Hero2 />
      <Hero3 />
      <Carousel1 />
      <ServiceCard />
      <Agile />
      <Testimonials />
      <Why />
      <ContactButton />
      
    </div>
  );
}
