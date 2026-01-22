'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    // Enable native smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    // Animate sections on scroll
    const sections = wrapperRef.current.querySelectorAll('section');
    
    sections.forEach((section, index) => {
      // Main section fade in animation
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 80,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Parallax effect for certain elements
      const parallaxElements = section.querySelectorAll('h1, h2, h3');
      parallaxElements.forEach((element) => {
        gsap.to(element, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    });

    // Smooth anchor link scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const href = target.getAttribute('href');
        if (href) {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            gsap.to(window, {
              duration: 1,
              scrollTo: { y: targetElement, offsetY: 80 },
              ease: 'power3.inOut',
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Cleanup
    return () => {
      document.documentElement.style.scrollBehavior = '';
      document.removeEventListener('click', handleAnchorClick);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={wrapperRef} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}
