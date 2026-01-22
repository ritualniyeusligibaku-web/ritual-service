"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import mosque from "@/public/mosque-minaret.jpg";
import { useMobile } from "@/src/hooks/use-mobile";

export default function AboutUs() {
  const t = useTranslations("AboutUs");

  const isMobile = useMobile();
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden mt-5 flex flex-col justify-center">
      <div className="absolute inset-0 z-0 h-full w-full">
        <Image
          src={mosque}
          alt="Religious building"
          fill
          className={`object-cover object-[0%_30%] transition-opacity duration-1000 ease-in-out`}
          quality={100}
          sizes="100vw"
        />
        {
          isMobile && (
            <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
          )
        }

      </div>
      <div className="relative z-10 flex h-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl flex flex-col items-center md:items-start py-5">
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-center md:text-left font-heading font-semibold text-white leading-tight">{t("title")}</h2>
            <div className="w-16 h-1 bg-primary my-6 md:self-start self-center"></div>
            <div className="flex flex-col gap-4">
              <p className="text-sm sm:text-base md:text-[16px] font-sans leading-relaxed text-white/80">
                {t("description_p1")}
              </p>
              <p className="text-sm sm:text-base md:text-[16px] font-sans leading-relaxed text-white/80">
                {t("description_p2")}
              </p>
              <p className="text-sm sm:text-base md:text-[16px] font-sans leading-relaxed text-white/80">
                {t("description_p3")}
              </p>
              <p className="text-sm sm:text-base md:text-[16px] font-sans leading-relaxed text-white/80">
                {t("description_p4")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}