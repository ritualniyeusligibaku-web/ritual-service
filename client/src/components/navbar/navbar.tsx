"use client";

import { Link } from "@/src/i18n/navigation";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import Image from "next/image";

import { useTranslations } from "next-intl";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Menu, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useMobile } from "@/src/hooks/use-mobile";
import LanguageSwitcher from "./language-switcer";
import MobileNav from "./mobile-nav";

export default function Navbar() {

  const t = useTranslations("Navbar");

  const isMobile = useMobile();

  const navigationItems = [
    { icon: <Phone className="h-4 w-4" />, label: "+994 99 366 63 66" },
    { icon: <MapPin className="h-4 w-4" />, label: t("address") },
    { icon: <Clock className="h-4 w-4" />, label: t("availability") },

  ];

  const rightNavigationItems = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/contact", label: t("contact") },
  ];

  if (isMobile) {
    return (
      <MobileNav navigationItems={navigationItems} rightNavigationItems={rightNavigationItems} />
    );
  }

  // Desktop menu
  return (
    <div className="container mx-auto">
      <NavigationMenu viewport={false} className="min-w-full py-5">
        <ul className="flex justify-between items-center w-full">
          <div className="flex gap-[31px]">
            {navigationItems.map((item) => (
              <div key={item.label} className="flex items-center gap-2 font-sans text-[12px] tracking-[1.68px] text-black/50">
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={140} height={100} />
          </Link>
          <div className="flex gap-[31px] items-center">
            {rightNavigationItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link
                    href={item.href}
                    className="text-[12px] tracking-[1.68px] text-black/50 font-sans"
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}

            <LanguageSwitcher />
          </div>
        </ul>
      </NavigationMenu>
    </div>
  );
}
