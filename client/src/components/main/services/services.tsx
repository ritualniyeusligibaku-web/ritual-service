"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState, useRef } from "react";
import ServiceCatalog from "./service-catalog";

export default function Services() {
  const t = useTranslations("Services");
  const [showTitle, setShowTitle] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const sectionOffsetTop = sectionRef.current.offsetTop;
      const scrollPosition = window.scrollY;

      // Check if section has reached the top of the window
      const sectionAtTop = sectionTop <= 0;
      
      // Calculate how much we've scrolled past the section top
      const scrollPastSection = scrollPosition - sectionOffsetTop;

      // Show title if section is at top AND scrolled 100px past it
      setShowTitle(sectionAtTop && scrollPastSection > 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="p-4 relative bg-gray-50">
      <div className={` sticky top-1/16 left-1/2 z-1 flex justify-center items-center pointer-events-none transition-opacity duration-300 ${showTitle ? "opacity-100" : "opacity-0"}`}>
        <h2
          className="border-2 border-gray-200 p-1 text-2xl md:text-4xl lg:text-6xl font-geologica uppercase tracking-[1.68px] font-bold text-transparent bg-clip-text bg-linear-to-b from-white/80 to-white/40"
        >
          {t("title")}
        </h2>
      </div>

      <div className="-mt-8 md:-mt-14">
        <ServiceCatalog />
      </div>
    </section>
  );
}
