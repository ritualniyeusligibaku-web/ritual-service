"use client";
import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const t = useTranslations("Footer");
  const [open, setOpen] = useState(false);

  return (
    <footer className="bg-[#1a1a1a] text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Left Section - About */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="font-heading text-2xl text-white mb-2">
                {t("title")}
              </h3>
              <p className="text-sm text-gray-400 font-sans">{t("subtitle")}</p>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              {t("description")}
            </p>
          </div>

          {/* Middle Section 1 - Working Hours */}
          <div>
            <h3 className="font-heading text-lg text-white mb-6 border-b border-gray-700 pb-2">
              {t("workingHours.title")}
            </h3>
            <div className="space-y-3">
              <p className="text-gray-300 text-sm font-sans leading-relaxed">
                {t("workingHours.schedule")}
              </p>
              <p className="text-gray-300 text-sm font-sans leading-relaxed">
                {t("workingHours.availability")}
              </p>
            </div>
          </div>


          {/* Right Section - Contact */}
          <div>
            <h3 className="font-heading text-lg text-white mb-6 border-b border-gray-700 pb-2">
              {t("contact.title")}
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 font-sans mb-1">
                  {t("contact.addressTitle")}:
                </p>
                <p className="text-gray-300 text-sm font-sans">
                  {t("contact.mainOffice")}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400 font-sans mb-1">
                  {t("contact.phoneTitle")}:
                </p>
                <a
                  href={`tel:${t("contact.phone")}`}
                  className="text-gray-300 text-sm hover:text-[#D4AF37] transition-colors font-sans"
                >
                  {t("contact.phone")}
                </a>
              </div>
              <div>
                <a
                  href="https://wa.me/994993666366"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-green-600 font-medium hover:text-green-700 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <FaWhatsapp size={14} color="#22c55e" /> {/* иконка меньше */}
                  <span className="font-sans">+994 99 366 63 66</span>
                </a>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-sans mb-1">
                  {t("contact.emailTitle")}:
                </p>
                <a
                  href={`mailto:${t("contact.email")}`}
                  className="text-gray-300 text-sm hover:text-[#D4AF37] transition-colors break-all font-sans"
                >
                  {t("contact.email")}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-400 font-sans">
            © {new Date().getFullYear()} {t("title")}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
