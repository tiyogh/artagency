"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    // 1. Hover pada Tombol / Link (Mode Invert Difference)
    const handleButtonEnter = () => {
      setCursorText("");
      cursor.classList.add("mix-blend-difference");
      gsap.to(cursor, {
        scale: 3,
        backgroundColor: "#ffffff",
        borderColor: "transparent",
        duration: 0.2,
      });
    };

    const handleButtonLeave = () => {
      cursor.classList.add("mix-blend-difference");
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(255, 255, 255, 0.5)",
        duration: 0.2,
      });
    };

    // 2. Hover pada Kartu Galeri (Mode Label "VIEW" Bersih)
    const handleCardEnter = () => {
      setCursorText("VIEW DETAIL");
      // Lepas mix-blend-difference agar warna gambar TIDAK rusak
      cursor.classList.remove("mix-blend-difference"); 
      gsap.to(cursor, {
        scale: 2.8,
        backgroundColor: "rgba(255, 255, 255, 0.68)", // Putih bersih semi-transparan
        borderColor: "transparent",
        duration: 0.25,
      });
    };

    const handleCardLeave = () => {
      setCursorText("");
      cursor.classList.add("mix-blend-difference");
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(255, 255, 255, 0.5)",
        duration: 0.2,
      });
    };

    // Pasang Event Listener spesifik
    const buttons = document.querySelectorAll("button, a");
    const cards = document.querySelectorAll(".gallery-card");

    buttons.forEach((el) => {
      el.addEventListener("mouseenter", handleButtonEnter);
      el.addEventListener("mouseleave", handleButtonLeave);
    });

    cards.forEach((el) => {
      el.addEventListener("mouseenter", handleCardEnter);
      el.addEventListener("mouseleave", handleCardLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      buttons.forEach((el) => {
        el.removeEventListener("mouseenter", handleButtonEnter);
        el.removeEventListener("mouseleave", handleButtonLeave);
      });
      cards.forEach((el) => {
        el.removeEventListener("mouseenter", handleCardEnter);
        el.removeEventListener("mouseleave", handleCardLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-difference hidden md:flex"
    >
      <span
        ref={textRef}
        className="text-[2.8px] font-bold tracking-widest text-black uppercase select-none"
      >
        {cursorText}
      </span>
    </div>
  );
}