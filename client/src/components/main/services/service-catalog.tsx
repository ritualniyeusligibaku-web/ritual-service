'use client';
import { useEffect, useRef } from "react";
import useServicesStore from "@/src/store/services.store";
import ServicesCard from "./services-card";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServiceCatalog() {
    const { services, isLoading, error, getServices } = useServicesStore();
    const t = useTranslations("Services");
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getServices();
    }, [getServices]);

    useEffect(() => {
        if (!isLoading && services.length > 0 && cardsRef.current) {
            const cards = cardsRef.current.querySelectorAll('.service-card-item');
            
            gsap.fromTo(
                cards,
                {
                    opacity: 0,
                    y: 60,
                    scale: 0.9,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }
    }, [isLoading, services]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <p className="text-lg font-sans text-gray-600">{t('loading')}</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center py-20">
                <p className="text-lg font-sans text-red-600">{t('error')}: {error}</p>
            </div>
        );
    }

    if (services.length === 0) {
        return (
            <div className="flex justify-center items-center py-20">
                <p className="text-lg font-sans text-gray-600">{t('noServices')}</p>
            </div>
        );
    }

    return (
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
                <div key={service._id} className="service-card-item">
                    <ServicesCard service={service} />
                </div>
            ))}
        </div>
    )
}