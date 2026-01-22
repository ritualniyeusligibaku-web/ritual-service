"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

import mosque from "@/public/mosque.webp";
import church from "@/public/church.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  const t = useTranslations("Hero");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [mosque, church];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Images with Crossfade */}
      <div className="absolute inset-0 z-0 h-full w-full">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt="Religious building"
            fill
            className={`object-cover object-[20%_20%] md:object-[0%_10%] transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            priority={index === 0}
            quality={100}
            sizes="100vw"
          />
        ))}
        {/* Enhanced dark overlay for better text readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="container mx-auto px-6 py-10">
          <div className="flex flex-col">
            {/* Main Heading */}
            <h1 className="self-center text-center mb-8 text-5xl font-heading font-light leading-tight text-white md:text-6xl lg:text-7xl">
              {t("title")}
            </h1>

            {/* Decorative Line */}
            <div className="w-20 h-1 bg-primary mb-8 self-center"></div>

            {/* Description */}
            <p className="self-center text-center text-lg font-sans leading-relaxed text-white/95 md:text-xl max-w-2xl">
              {t("description")}
            </p>

            <div className="flex flex-col self-center my-12 gap-6 md:flex-row md:gap-4">
              <Link href={"/services"}>
                <Button variant={"bordered"} size={"lg"} className="min-w-48">{t("services")}</Button>
              </Link>
              <Link href={"/contact"}>
                <Button variant={"bordered"} size={"lg"} className="min-w-48">{t("consultation")}</Button>
              </Link>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}
