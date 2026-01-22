"use client";

import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Menu, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LanguageSwitcher from "./language-switcer";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { NavbarItems, RightNavbarItems } from "@/types/navbar-item.types";

interface MobileNavProps {
  navigationItems: NavbarItems;
  rightNavigationItems: RightNavbarItems;
}

export default function MobileNav({ navigationItems, rightNavigationItems }: MobileNavProps) {
  const t = useTranslations("Navbar");

  return (
    <div className="container">
    <div className="flex justify-between items-center py-5 px-4">
      <Link href="/" className="px-">
        <Image src="/logo.png" alt="logo" width={100} height={100} />
      </Link>
      {/* Mobile menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="p-0">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold text-center">
              <div className="flex gap-4 items-center justify-center">
                <Link href="/">
                  <Image src="/logo.png" alt="logo" width={100} height={100} />
                </Link>
                <div className="flex">
                  <LanguageSwitcher />
                </div>
              </div>
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col items-center mt-8 flex-1">
            <div className="flex flex-col gap-8 items-center flex-1 justify-start">
              {rightNavigationItems.map((item) => (
                <Link
                  href={item.href}
                  className="text-lg tracking-[1.68px] text-black/50 hover:text-black font-sans"
                  key={item.label}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Separator className="w-full mb-4" />
            <div className="flex flex-col gap-2 items-center pb-4">
              {navigationItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-[12px] tracking-[1px] text-black/80 font-sans"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  </div>
  );
}
