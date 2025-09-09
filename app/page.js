import Image from "next/image";
import { Hero1 } from "./ui/Hero1";
import { Hero2 } from "./ui/Hero2";
import { Hero3 } from "./ui/Hero3";

export default function Home() {
  return (
    <div>
      <Hero1 />
      <Hero2 />
      <Hero3 />
    </div>
  );
}
