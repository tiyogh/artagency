"use client"

import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import WorkModal, { Artwork } from "./WorkModal"

gsap.registerPlugin(ScrollTrigger)

const ARTWORKS: Artwork[] = [
  { id: 1, title: "Abstract Chaos", category: "Digital Art", year: "2026", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w-600" },
  { id: 2, title: "Neon Cyberpunk", category: "3D Motion", year: "2025", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600" },
  { id: 3, title: "Ethereal Form", category: "Sculpture", year: "2026", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600" },
  { id: 4, title: "Brutalist Structure", category: "Architecture", year: "2025", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600" },
]

export default function Gallery() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork |  null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const colLeftRef = useRef<HTMLDivElement>(null)
  const colRightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!colLeftRef.current || !colRightRef.current) return

      gsap.fromTo(
        colLeftRef.current,
        { y: 50 },
        {
          y: -100,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        }
      )

      gsap.fromTo(
        colRightRef.current,
        { y: -100 },
        {
          y: 100,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        }
      )

      gsap.utils.toArray<HTMLElement>(".gallery-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.9 },
          { opacity: 1,
            scale: 1,
            duration: 1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-[#0d0d0d] text-[#f5f5f5] py-24 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-sm uppercase tracking-[0.3em] text-zinc-500 mb-2">
          Curated Works
        </h2>
        <p className="text-3xl md:text-5xl font-light tracking-tight">
          Selected Exhibitions & <span className="italic font-serf text-purple-400">Digital Artifacts.</span>
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">

        <div ref={colLeftRef} className="flex flex-col gap-12 md:gap-24">
          {ARTWORKS.filter((_, i) => i % 2 === 0).map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArtwork(art)}
              className="gallery-card group relative cursor-pointer"
            >
              <div className="overflow-hidden aspect-[3/4] bg-zinc-900 rounded-2xl mb-4">
                <img
                  src={art.img}
                  alt={art.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              </div>
              <h3 className="text-xl fornt-medium">{art.title}</h3>
              <p className="text-sm text-zinc-500">{art.category}</p>
            </div>
          ))}
        </div>

        <div ref={colRightRef} className="flex flex-col gap-12 md:gap-24 md:mt-32">
          {ARTWORKS.filter((_, i) => i % 2 !== 0).map((art) => (
            <div
              key={art.id}
              onClick={() => {setSelectedArtwork(art)}}
              className="gallery-card group relative cursor-pointer"
            >
              <div className="overflow-hidden aspect-[3/4] bg-zinc-900 rounded-2xl mb-4">
                <img
                  src={art.img}
                  alt={art.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              </div>
              <h3 className="text-xl font-medium">{art.title}</h3>
              <p className="text-sm text-zinc-500">{art.category}</p>
            </div>
          ))}
        </div>

      </div>

      <WorkModal
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
      />
    </section>
  )
}
