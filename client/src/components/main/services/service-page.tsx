"use client";

import { Service } from "@/types/services.types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServicePageProps {
  service: Service;
}

export default function ServicePage({ service }: ServicePageProps) {
  const params = useParams();
  const locale = (params.locale as "az" | "ru" | "en") || "en";
  const t = useTranslations("ServicePage");
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Collect all title/paragraph pairs that exist
  const contentSections = [];
  for (let i = 1; i <= 7; i++) {
    const titleKey = `title${i}` as keyof Service;
    const paragraphKey = `paragraph${i}` as keyof Service;
    
    const title = service[titleKey];
    const paragraph = service[paragraphKey];
    
    // Type guard to ensure we have LocalizedString objects
    if (
      title && 
      paragraph && 
      typeof title === 'object' && 
      typeof paragraph === 'object' &&
      'az' in title && 
      'az' in paragraph
    ) {
      const titleText = title[locale];
      const paragraphText = paragraph[locale];
      
      // Only add if both title and paragraph have actual content
      if (titleText && titleText.trim() !== '' && paragraphText && paragraphText.trim() !== '') {
        contentSections.push({
          title: titleText,
          paragraph: paragraphText,
        });
      }
    }
  }

  useEffect(() => {
    // Image animation from bottom
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }

    // Content fade in animation
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll(".animate-content");
      gsap.fromTo(
        elements,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.4,
        }
      );
    }

    // Smooth scroll behavior
    gsap.to(window, {
      scrollBehavior: "smooth",
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Two Column Layout */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Side - Scrollable Content */}
        <div className="w-full lg:w-1/2 overflow-y-auto">
          <div ref={contentRef} className="px-8 md:px-12 lg:px-16 xl:px-24 py-20 lg:py-32">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <Link 
                href={`/${locale}`}
                className="hover:text-gray-900 transition-colors"
              >
                {t("breadcrumb.home")}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link 
                href={`/${locale}/services`}
                className="hover:text-gray-900 transition-colors"
              >
                {t("breadcrumb.services")}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">
                {service.name[locale]}
              </span>
            </nav>
            {/* Location */}
            <p className="animate-content text-sm uppercase tracking-[0.3em] text-gray-500 mb-8 font-light">
              BAKU, AZERBAIJAN
            </p>

            {/* Title */}
            <h1 className="animate-content text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.1] text-gray-900 mb-12 tracking-tight">
              {service.name[locale]}
            </h1>

            {/* Description */}
            <div className="animate-content space-y-6 text-base md:text-lg leading-relaxed text-gray-700 font-light max-w-xl">
              <p>{service.description[locale]}</p>
            </div>

            {/* Content Sections */}
            {contentSections.length > 0 && (
              <div className="mt-16 space-y-12 max-w-xl">
                {contentSections.map((section, index) => (
                  <div key={index} className="animate-content">
                    <h2 className="text-xl md:text-2xl font-light text-gray-900 mb-4 tracking-tight">
                      {section.title}
                    </h2>
                    <p className="text-base md:text-lg leading-relaxed text-gray-700 font-light whitespace-pre-line">
                      {section.paragraph}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Button */}
            <div className="animate-content mt-16">
              <a
                href={`/${locale}/contact`}
                className="inline-block px-8 py-4 border border-gray-900 text-gray-900 text-sm uppercase tracking-[0.2em] font-light hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                {t("footer.button")}
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - Fixed Image */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden">
          <div ref={imageRef} className="relative w-full h-full">
            <Image
              src={service.image}
              alt={service.name[locale]}
              fill
              className="object-cover grayscale"
              priority
              quality={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
