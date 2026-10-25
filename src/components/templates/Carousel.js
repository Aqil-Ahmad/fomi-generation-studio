"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import styles from "./Carousel.module.css";

export function CarouselItem({ children }) {
  return <li className={styles.item}>{children}</li>;
}

export function Carousel({ label, children }) {
  const listRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let frame = 0;

    function measure() {
      frame = 0;
      const start = list.scrollLeft <= 4;
      const end = list.scrollLeft + list.clientWidth >= list.scrollWidth - 4;
      setEdges((current) => (current.start === start && current.end === end ? current : { start, end }));
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(measure);
    }

    schedule();
    list.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      list.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  function scroll(direction) {
    const list = listRef.current;
    if (!list) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollBy({ left: direction * list.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <div className="relative">
      <ul
        ref={listRef}
        aria-label={label}
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 no-scrollbar sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:-mx-8 lg:scroll-px-8 lg:px-8"
      >
        {children}
      </ul>
      {!edges.end && (
        <div className="pointer-events-none absolute inset-y-0 -right-2 hidden items-center pb-14 lg:flex">
          <IconButton label={`Next ${label.toLowerCase()}`} tooltipSide="left" onClick={() => scroll(1)} className="pointer-events-auto bg-surface shadow-float">
            <ChevronRight aria-hidden="true" size={20} />
          </IconButton>
        </div>
      )}
      {!edges.start && (
        <div className="pointer-events-none absolute inset-y-0 -left-2 hidden items-center pb-14 lg:flex">
          <IconButton label={`Previous ${label.toLowerCase()}`} tooltipSide="right" onClick={() => scroll(-1)} className="pointer-events-auto bg-surface shadow-float">
            <ChevronLeft aria-hidden="true" size={20} />
          </IconButton>
        </div>
      )}
    </div>
  );
}
