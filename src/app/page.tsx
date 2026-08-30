import Hero from "@/components/Hero";
import Cursor from "@/components/Cursor"
import Marquee from "@/components/Marquee"
import Gallery from "@/components/Gallery"
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-[#0d0d0d] relative">
      <Cursor />
      <Hero />
      <Marquee />
      <Gallery />
      <Contact />
    </main>
  );
}