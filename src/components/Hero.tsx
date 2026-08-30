"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

      tl.fromTo(
        ".animate-title-word",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, delay: 0.2 }
      );

      tl.fromTo(
        [subtitleRef.current, ctaRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.15 },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 bg-[#0d0d0d] text-[#f5f5f5] overflow-hidden"
    >
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-purple-600/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full z-10">
        <span className="text-xs uppercase tracking-[0.3em] text-purple-400 font-semibold mb-4 block">
          Art & Digital Agency
        </span>

        <h1
          ref={titleRef}
          className='text-5xl md:text-8xl font-black tracking-tight leading-[0.9] uppercase mb-8'
        >
          <div className='overflow-hidden inline-block mr-4 py-2'>
            <span className='animate-title-word inline-block'>We</span>
          </div>
          <div className='overflow-hidden inline-block mr-4 py-2'>
            <span className='animate-title-word inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500'>
              Shape
              </span>
          </div>
          <br />
          <div className='overflow-hidden inline-block mr-4 py-2'>
            <span className='animate-title-word inline-block'>Human</span>
          </div>
          <div className='overflow-hidden inline-block py-2'>
            <span className='animate-title-word inline-block'>Emotion.</span>
          </div>
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-4'>
          <p ref={subtitleRef} className='text-lg md:text-xl text-zinc-400 leading-relaxed font-light'>A Collective Studio bridging pure art and digital technology. We are design visual experience that impression into heart and mind.</p>

        <div ref={ctaRef} className='flex flex-col sm:flex-row gap-4 md:justify-end'>
          <button className='px-8 py-4 bg-white text-black font-medium hover:bg-zinc-200 transition-colors rounded-full text-sm uppercase tracking-wider'>
            Explore Gallery
          </button>
          <button className='px-8 py-4 border border-zinc-700 text-white font-medium hover:bg-zinc-900 transtition-colors rounded-full text-sm uppercase tracking-wider'>
            Contact Us
          </button>
        </div>
      </div>
    </div>
    </section>
  )
}