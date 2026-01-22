import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getBreadcrumbSchema } from "@/src/lib/seo";
import ContactForm from "@/src/components/contact/contact-form";

interface ContactPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });

  const titles = {
    en: "Contact Us - Ritual Service Baku | 24/7 Available",
    ru: "Свяжитесь с нами - Похоронные услуги Баку | Доступно 24/7",
    az: "Bizimlə əlaqə - Ritual Xidmət Bakı | 24/7 əlçatandır",
  };

  const descriptions = {
    en: "Contact Ritual Service for professional funeral services in Baku, Azerbaijan. Available 24/7 for immediate assistance. Call +994 99 366 63 66 or visit us at Mahammad Hadi 142A.",
    ru: "Свяжитесь с Похоронными услугами для профессиональных ритуальных услуг в Баку, Азербайджан. Доступны 24/7 для немедленной помощи. Звоните +994 99 366 63 66 или посетите нас по адресу Махаммад Хади 142А.",
    az: "Dəfn xidmətləri üçün Ritual Xidmət ilə əlaqə saxlayın, Bakı, Azərbaycan. Təcili yardım üçün 24/7 əlçatandır. +994 99 366 63 66 zəng edin və ya Məhəmməd hadi 142A ünvanında bizə müraciət edin.",
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description:
      descriptions[locale as keyof typeof descriptions] || descriptions.en,
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description:
        descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `https://ritualnieuslugibaku.com/${locale}/contact`,
      type: "website",
    },
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const t = await getTranslations("ContactPage");

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Ritual Service",
    description: t("description"),
    url: `https://ritualnieuslugibaku.com/${locale}/contact`,
    mainEntity: {
      "@type": "FuneralHome",
      name: "Ritual Service",
      telephone: "+994 99 366 63 66",
      email: "info@ritualnieuslugibaku.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Mahammad Hadi 142A",
        addressLocality: "Baku",
        addressCountry: "Azerbaijan",
      },
    },
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `/${locale}` },
    { name: "Contact", url: `/${locale}/contact` },
  ]);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* Main Contact Section */}
        <section className="py-16 md:py-24 px-4 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left Side - Contact Information */}
              <div className="space-y-8 lg:pr-12">
                <div>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-normal text-gray-900 leading-tight mb-12">
                    {t("title")}
                  </h1>

                  <div className="space-y-6">
                    <div>
                      <a
                        href={`mailto:${t("contactInfo.email.address")}`}
                        className="text-lg md:text-xl text-gray-900 hover:text-gray-600 transition-colors underline decoration-1 underline-offset-4"
                      >
                        {t("contactInfo.email.address")}
                      </a>
                    </div>

                    <div className="space-y-2">
                      <a
                        href={`tel:${t("contactInfo.phone.number")}`}
                        className="block text-lg md:text-2xl text-gray-900 hover:text-gray-600 transition-colors"
                      >
                        {t("contactInfo.phone.number")}
                      </a>
                    </div>
                  </div>

                  <div className="w-full h-[500px] overflow-hidden shadow-lg border border-gray-200 mt-12">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.166553907405!2d49.9539754!3d40.3830011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40306342b88e62a5%3A0x7c957e9f983b2e20!2zMTQyIE3JmWjJmW1tyZlkIEhhZGksIEJha8Sx!5e0!3m2!1sru!2saz!4v1767099640515!5m2!1sru!2saz"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={t("map.heading")}
                    />
                  </div>
                </div>
              </div>

              {/* Right Side - Contact Form */}
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>


      </div>
    </>
  );
}
