import apiServices from "@/src/services/api.services";
import ServicesCard from "@/src/components/main/services/services-card";
import { Service } from "@/types/services.types";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getBreadcrumbSchema } from "@/src/lib/seo";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface ServicesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesPage" });

  const titles = {
    en: "Our Funeral Services | Ritual Service Baku",
    ru: "Наши ритуальные услуги | Похоронные услуги Баку",
    az: "Bizim xidmətlərimiz | Ritual Xidmət Bakı",
  };

  const descriptions = {
    en: "Comprehensive funeral and burial services in Baku, Azerbaijan. From traditional funerals to cremation services, we provide professional care with dignity and respect. Available 24/7.",
    ru: "Комплексные ритуальные и похоронные услуги в Баку, Азербайджан. От традиционных похорон до кремации, мы предоставляем профессиональную заботу с достоинством и уважением. Доступно 24/7.",
    az: "Bakıda kompleks dəfn və ritual xidmətləri, Azərbaycan. Ənənəvi dəfnlərdən tutmuş kremasiya xidmətlərinə qədər ləyaqət və hörmətlə professional qayğı göstəririk. 24/7 əlçatandır.",
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description:
      descriptions[locale as keyof typeof descriptions] || descriptions.en,
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description:
        descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `https://ritualnieuslugibaku.com/${locale}/services`,
      type: "website",
    },
  };
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  const t = await getTranslations("ServicesPage");

  let services: Service[] = [];
  let error = false;

  try {
    services = await apiServices.getAllServices();
  } catch (err) {
    error = true;
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `/${locale}` },
    { name: "Services", url: `/${locale}/services` },
  ]);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative px-4 border-b ">
          <div className="text-center my-4 border-black">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black flex flex-col items-start justify-center min-h-auto md:min-h-[300px]">
                <div className="w-full px-6 pt-6">
                  <nav className="flex items-center gap-2 text-sm text-gray-300">
                    <Link 
                      href={`/${locale}`}
                      className="hover:text-white transition-colors"
                    >
                      {t("breadcrumb.home")}
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-white font-medium">
                      {t("breadcrumb.services")}
                    </span>
                  </nav>
                </div>
                {/* Title */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white py-8 px-6 mb-8 leading-tight">
                  {t("title")}
                </h1>
              </div>
              <div className="flex flex-col p-4 items-center justify-center min-h-auto md:min-h-[300px]">

                <p className="text-xl md:text-2xl font-sans text-gray-700 mb-6 font-normal">
                  {t("subtitle")}
                </p>

                <div className="w-32 h-1 bg-black/60 mx-auto mb-6"></div>

                {/* Description */}
                <p className="text-lg font-sans text-gray-600 leading-relaxed max-w-3xl mx-auto">
                  {t("description")}
                </p>
              </div>
            </div>

          </div>
          {/* Services Grid */}
          {error ? (
            <div className="text-center py-12">
              <p className="text-lg text-red-600 font-sans">{t("error")}</p>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 font-sans">
                {t("noServices")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => (
                <ServicesCard key={service._id} service={service} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

// Revalidate the page every hour
export const revalidate = 3600;
