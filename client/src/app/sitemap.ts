import { MetadataRoute } from "next";
import apiServices from "@/src/services/api.services";
import { Service } from "@/types/services.types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ritualnieuslugibaku.com";
  const locales = ["en", "ru", "az"];

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [];

  // Generate static pages for each locale
  locales.forEach((locale) => {
    staticPages.push(
      {
        url: `${baseUrl}/${locale}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1.0,
        alternates: {
          languages: {
            en: `${baseUrl}/en`,
            ru: `${baseUrl}/ru`,
            az: `${baseUrl}/az`,
          },
        },
      },
      {
        url: `${baseUrl}/${locale}/services`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
        alternates: {
          languages: {
            en: `${baseUrl}/en/services`,
            ru: `${baseUrl}/ru/services`,
            az: `${baseUrl}/az/services`,
          },
        },
      },
      {
        url: `${baseUrl}/${locale}/contact`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en/contact`,
            ru: `${baseUrl}/ru/contact`,
            az: `${baseUrl}/az/contact`,
          },
        },
      }
    );
  });

  // Fetch all services and generate URLs
  try {
    const services = await apiServices.getAllServices();

    const servicePages: MetadataRoute.Sitemap = services.flatMap(
      (service: Service) =>
        locales.map((locale) => ({
          url: `${baseUrl}/${locale}/services/${service.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.7,
          alternates: {
            languages: {
              en: `${baseUrl}/en/services/${service.slug}`,
              ru: `${baseUrl}/ru/services/${service.slug}`,
              az: `${baseUrl}/az/services/${service.slug}`,
            },
          },
        }))
    );

    return [...staticPages, ...servicePages];
  } catch (error) {
    return staticPages;
  }
}
