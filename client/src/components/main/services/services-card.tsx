"use client";

import { Service } from "@/types/services.types";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useMobile } from "@/src/hooks/use-mobile";
import gsap from "gsap";

interface ServicesCardProps {
  service: Service;
}

export default function ServicesCard({ service }: ServicesCardProps) {
  const params = useParams();
  const locale = (params.locale as "az" | "ru" | "en") || "en";
  const t = useTranslations("Services");
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useMobile();
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobile && cardRef.current && contentRef.current && imageRef.current) {
      const card = cardRef.current;
      const content = contentRef.current;
      const image = imageRef.current;

      const handleMouseEnter = () => {
        gsap.to(image, {
          scale: 1.1,
          duration: 0.7,
          ease: 'power2.out',
        });

        gsap.to(content, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(image, {
          scale: 1,
          duration: 0.7,
          ease: 'power2.inOut',
        });

        gsap.to(content, {
          y: 100,
          opacity: 0,
          duration: 0.5,
          ease: 'power3.in',
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [isMobile]);

  // Mobile Layout: Traditional card with expandable description
  if (isMobile) {
    return (
      <div className="bg-white overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-lg">
        {/* Image Section */}
        <div className="relative w-full h-64 bg-gray-100">
          <Image
            src={service.image}
            alt={service.name[locale]}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col grow">
          {/* Title */}
          {isMobile ? (
            <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-3 leading-tight flex flex-col">
              <span>{service.name[locale]}</span>
            </h3>
          ) : (
            <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-3 leading-tight flex flex-col">
              {service.name[locale].split(' ').map((word, index) => (
                <span key={index}>{word}</span>
              ))}
            </h3>
          )}

          {/* Description */}
          <div className="mb-6 grow">
            <p
              className={`text-gray-600 text-base font-sans leading-relaxed ${!isExpanded ? "line-clamp-3" : ""
                }`}
            >
              {service.description[locale]}
            </p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary hover:text-primary/80 text-sm font-medium mt-2 transition-colors"
            >
              {isExpanded ? "Show less" : "..."}
            </button>
          </div>

          {/* Show More Button */}
          <Link href={`/${locale}/services/${service.slug}`} className="w-full">
            <Button
              variant="border"
              size="lg"
            >
              {t("showMore")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Desktop Layout: Background image with hover slide-up effect
  return (
    <div ref={cardRef} className="group relative overflow-hidden h-[450px] transition-all duration-500 hover:shadow-2xl">
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src={service.image}
          alt={service.name[locale]}
          fill
          className="object-cover"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/20 to-black/80 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/95 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-between p-6">
        {/* Title - Always visible at top */}
        <div className="z-10 self-end">
          <h3 className="text-3xl font-sans tracking-[1.68px] text-white drop-shadow-lg leading-tight flex flex-col items-end">
            {service.name[locale].split(' ').map((word, index) => (
              <span key={index}>{word}</span>
            ))}
          </h3>
        </div>

        {/* Description & Button - Slides up on hover */}
        <div ref={contentRef} className="translate-y-full opacity-0 space-y-4">
          {/* Description */}
          <div className="bg-white p-4 flex flex-col gap-8">
            <p className="text-gray-900 text-base font-sans leading-relaxed line-clamp-4">
              {service.description[locale]}
            </p>
            <Link href={`/${locale}/services/${service.slug}`} className="block self-end">
              <Button
                variant="border"
                size="lg"
                className="hover:text-white "
              >
                {t("showMore")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
