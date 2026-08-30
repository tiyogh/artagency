"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export interface Artwork {
  id: number;
  title: string;
  category: string;
  img: string;
  description?: string;
  year?: string;
}

interface WorkModalProps {
  artwork: Artwork | null;
  onClose: () => void;
}

export default function WorkModal({ artwork, onClose }: WorkModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (artwork) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" }
        );
        gsap.fromTo(
          contentRef.current,
          { scale: 0.85, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out", delay: 0.1 }
        );
      });
      return () => ctx.revert();
    }
  }, [artwork]);

  if (!artwork) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#141414] border border-white/10 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-colors"
        >
          ✕
        </button>

        <div className="aspect-square md:aspect-auto w-full h-full bg-zinc-900 overflow-hidden">
          <img
            src={artwork.img}
            alt={artwork.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8 md:p-12 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-purple-400 font-semibold mb-2 block">
              {artwork.category} • {artwork.year || "2026"}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {artwork.title}
            </h3>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6">
              {artwork.description ||
                "Sebuah eksplorasi visual mendalam yang mengombinasikan estetika kontemporer, tekstur organik, dan ruang digital untuk menciptakan respon emosional pada audiens."}
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-zinc-500 uppercase tracking-widest">
              Status: Exhibition Ready
            </span>
            <button className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs uppercase tracking-wider rounded-full transition-colors">
              Inquire Artwork
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
