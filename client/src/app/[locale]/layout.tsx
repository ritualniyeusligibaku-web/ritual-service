import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";
import { Locale } from "@/src/i18n/locales";
import { routing } from "@/src/i18n/routing";
import { getFuneralHomeSchemaByLocale } from "@/src/lib/seo";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: "Ritual Service - Professional Funeral Services in Baku, Azerbaijan",
    ru: "Похоронные услуги - Профессиональные ритуальные услуги в Баку, Азербайджан",
    az: "Ritual Xidmət - Professional dəfn xidmətləri Bakıda, Azərbaycan",
  };

  const descriptions = {
    en: "Professional funeral and burial services in Baku, Azerbaijan. Available 24/7. Providing dignified funeral services to Azerbaijan, CIS countries and beyond since 2010.",
    ru: "Профессиональные ритуальные и похоронные услуги в Баку, Азербайджан. Доступно 24/7. Предоставляем достойные похоронные услуги в Азербайджане, странах СНГ и за рубежом с 2010 года.",
    az: "Bakıda professional dəfn və ritual xidmətləri, Azərbaycan. 24/7 əlçatandır. 2010-cu ildən Azərbaycan, MDB ölkələri və digər ölkələrdə ləyaqətli dəfn xidmətləri göstəririk.",
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description:
      descriptions[locale as keyof typeof descriptions] || descriptions.en,

    alternates: {
      canonical: `https://ritualservice.org/${locale}`,
      languages: {
        ru: "https://ritualservice.org/ru",
        az: "https://ritualservice.org/az",
        en: "https://ritualservice.org/en",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const messages = await getMessages();
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const funeralHomeSchema = getFuneralHomeSchemaByLocale(
    locale as "en" | "ru" | "az",
  );

  return (
    <NextIntlClientProvider messages={messages}>
      {/* Structured Data - Funeral Home Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(funeralHomeSchema) }}
      />
      <Navbar />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}
