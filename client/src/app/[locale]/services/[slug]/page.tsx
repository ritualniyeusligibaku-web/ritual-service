import ServicePage from "@/src/components/main/services/service-page";
import apiServices from "@/src/services/api.services";
import { Service } from "@/types/services.types";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServiceSchema, getBreadcrumbSchema } from "@/src/lib/seo";

interface ServiceDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug, locale } = await params;

  try {
    const service = await apiServices.getServiceBySlug(slug);

    if (!service) {
      console.warn(`Service not found for slug: ${slug}`);
      return {
        title: "Service Not Found",
        description: "The requested service could not be found.",
      };
    }

    const title = service.name[locale as keyof typeof service.name] || service.name.en;
    const description = service.description[locale as keyof typeof service.description] || service.description.en;

    return {
      title: `${title} | Ritual Service Baku`,
      description: description,
      keywords: [
        title,
        "funeral service",
        "burial service",
        "Baku Azerbaijan",
        "ritual service",
      ],
      openGraph: {
        title: `${title} | Ritual Service`,
        description: description,
        url: `https://ritualnieuslugibaku.com/${locale}/services/${slug}`,
        type: "website",
        images: [
          {
            url: service.image,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | Ritual Service`,
        description: description,
        images: [service.image],
      },
    };
  } catch (error) {
    console.error(`Error generating metadata for slug ${slug}:`, error);
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    };
  }
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug, locale } = await params;

  let service;
  
  try {
    service = await apiServices.getServiceBySlug(slug);
    
    if (!service) {
      console.warn(`Service not found for slug: ${slug}`);
      notFound();
    }
  } catch (error) {
    console.error(`Error fetching service for slug ${slug}:`, error);
    notFound();
  }

  const serviceName = service.name[locale as keyof typeof service.name] || service.name.en;
  const serviceDescription = service.description[locale as keyof typeof service.description] || service.description.en;

  const serviceSchema = getServiceSchema({
    name: serviceName,
    description: serviceDescription,
    image: service.image,
    slug: service.slug,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `/${locale}` },
    { name: "Services", url: `/${locale}/services` },
    { name: serviceName, url: `/${locale}/services/${slug}` },
  ]);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicePage service={service} />
    </>
  );
}

// Generate static params for all services (optional, for static generation)
export async function generateStaticParams() {
  try {
    const services = await apiServices.getAllServices();
    if (!services || !Array.isArray(services)) {
      console.warn('No services returned from API');
      return [];
    }
    return services.map((service: Service) => ({
      slug: service.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Enable dynamic rendering with revalidation
export const dynamic = 'force-dynamic';
export const revalidate = 60; // Revalidate every minute
