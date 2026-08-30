"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function Marquee() {
  const firstText = useRef<HTMLParagraphElement>(null)
  const secondText = useRef<HTMLParagraphElement>(null)
  const slider = useRef<HTMLDivElement>(null)
  let xPercent = 0
  let direction = -1

  useEffect(() => {
    let animationFrameId: number

    const animate = () => {
      if (xPercent < -100) {
        xPercent = 0
      }
      if (xPercent > 0) {
        xPercent = -100
      }
      if (firstText.current && secondText.current) {
        gsap.set(firstText.current, { xPercent: xPercent })
        gsap.set(secondText.current, { xPercent: xPercent})
      }
      xPercent += 0.08 * direction
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return (
    <section className="relative flex overflow-hidden py-12 bg-purple-950/20 border-y border-white/10 my-12">
      <div ref={slider} className="relative whitespace-nowrap flex">
        <p
          ref={firstText}
          className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-500 to-zinc-200 pr-12"
        >• DIGITAL ARTISTRY • 3D EXPERIENCES • CREATIVE DIRECTION • VISUAL IDENTITY</p>
        <p
          ref = {secondText}
          className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-500 to-zinc-200 pr-12"
        >• DIGITAL ARTISTRY • 3D EXPERIENCES • CREATIVE DIRECTION • VISUAL IDENTITY</p>
      </div>
    </section>
  )
}