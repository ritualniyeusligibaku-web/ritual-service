import AboutUs from "@/src/components/main/about-us/about-us";
import Hero from "@/src/components/main/hero/hero";
import Services from "@/src/components/main/services/services";
import PageWrapper from "@/src/components/page-wrapper";
import { getLocalBusinessSchema, getBreadcrumbSchema } from "@/src/lib/seo";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Hero" });

  const titles = {
    en: "Ritual Service - Professional Funeral Services in Baku | Available 24/7",
    ru: "Похоронные услуги - Профессиональные ритуальные услуги в Баку | Доступно 24/7",
    az: "Ritual Xidmət - Professional dəfn xidmətləri Bakıda | 24/7 əlçatandır",
  };

  const descriptions = {
    en: "Professional funeral and burial services in Baku, Azerbaijan. We provide compassionate care and support during difficult times. Available 24/7. Serving Azerbaijan, CIS countries and beyond since 2010.",
    ru: "Профессиональные ритуальные и похоронные услуги в Баку, Азербайджан. Мы оказываем заботливую поддержку в трудные времена. Доступно 24/7. Обслуживаем Азербайджан, страны СНГ и за рубежом с 2010 года.",
    az: "Bakıda professional dəfn və ritual xidmətləri, Azərbaycan. Çətin vaxtlarda şəfqətli qayğı və dəstək göstəririk. 24/7 əlçatandır. 2010-cu ildən Azərbaycan, MDB ölkələri və digər ölkələrdə xidmət göstəririk.",
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description:
      descriptions[locale as keyof typeof descriptions] || descriptions.en,
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description:
        descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `https://ritualnieuslugibaku.com/${locale}`,
      type: "website",
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const localBusinessSchema = getLocalBusinessSchema();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `/${locale}` },
  ]);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageWrapper>
        <Hero />
        <AboutUs />
        <Services />
      </PageWrapper>
    </>
  );
}
