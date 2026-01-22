import { Metadata } from "next";

export const siteConfig = {
  name: "Ritual Service",
  description: {
    en: "Professional funeral and burial services in Baku, Azerbaijan. Available 24/7. Providing dignified funeral services to Azerbaijan, CIS countries and beyond since 2010.",
    ru: "Профессиональные ритуальные и похоронные услуги в Баку, Азербайджан. Доступно 24/7. Предоставляем достойные похоронные услуги в Азербайджане, странах СНГ и за рубежом с 2010 года.",
    az: "Bakıda professional dəfn və ritual xidmətləri, Azərbaycan. 24/7 əlçatandır. 2010-cu ildən Azərbaycan, MDB ölkələri və digər ölkələrdə ləyaqətli dəfn xidmətləri göstəririk.",
  },
  url: "https://ritualnieuslugibaku.com",
  ogImage: "/og-image.jpg",
  phone: "+994 50 662 44 88",
  email: "info@ritualnieuslugibaku.com",
  address: {
    street: "Mahammad Hadi 142A",
    city: "Baku",
    country: "Azerbaijan",
    postalCode: "AZ1000",
  },
};

export function generateSEOMetadata({
  title,
  description,
  path = "/",
  locale = "en",
  keywords = [],
  ogImage,
}: {
  title: string;
  description: string;
  path?: string;
  locale?: string;
  keywords?: string[];
  ogImage?: string;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const defaultKeywords = [
    "funeral services",
    "burial services",
    "Baku Azerbaijan",
    "ritual services",
    "cremation",
    "memorial services",
    "ритуальные услуги",
    "dəfn xidmətləri",
  ];

  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords].join(", "),
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      telephone: true,
      email: true,
      address: true,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages: {
        en: `/en${path}`,
        ru: `/ru${path}`,
        az: `/az${path}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale,
      url: url,
      title: title,
      description: description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [ogImage || siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
    },
  };
}

// Funeral Home Schema by Locale
export const funeralHomeSchemaByLocale = {
  ru: {
    "@context": "https://schema.org",
    "@type": "FuneralHome",
    name: "Ритуальные услуги в Баку",
    url: "https://ritualnieuslugibaku.com/ru",
    description:
      "Ритуальные и похоронные услуги в Баку и по всему Азербайджану. Организация похорон, кремация, мемориальные услуги, транспортировка и международная репатриация тел умерших.",
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Азербайджан",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Баку",
      addressCountry: "AZ",
    },
    availableLanguage: ["ru", "az", "en"],
    telephone: siteConfig.phone,
    email: siteConfig.email,
    geo: {
      "@type": "GeoCoordinates",
      latitude: "40.3892857",
      longitude: "49.8267558",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "$$",
  },
  az: {
    "@context": "https://schema.org",
    "@type": "FuneralHome",
    name: "Bakıda dəfn və mərasim xidmətləri",
    url: "https://ritualnieuslugibaku.com/az",
    description:
      "Bakıda və Azərbaycanın bütün bölgələrində dəfn və mərasim xidmətləri. Dəfnin təşkili, kremasiya, xatirə mərasimləri, mərhumların daşınması və beynəlxalq repatriasiya.",
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Azərbaycan",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bakı",
      addressCountry: "AZ",
    },
    availableLanguage: ["az", "ru", "en"],
    telephone: siteConfig.phone,
    email: siteConfig.email,
    geo: {
      "@type": "GeoCoordinates",
      latitude: "40.3892857",
      longitude: "49.8267558",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "$$",
  },
  en: {
    "@context": "https://schema.org",
    "@type": "FuneralHome",
    name: "Funeral Services in Baku",
    url: "https://ritualnieuslugibaku.com/en",
    description:
      "Professional funeral services in Baku and across Azerbaijan. Funeral arrangement, cremation, memorial services, body transportation and international repatriation.",
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Azerbaijan",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Baku",
      addressCountry: "AZ",
    },
    availableLanguage: ["en", "ru", "az"],
    telephone: siteConfig.phone,
    email: siteConfig.email,
    geo: {
      "@type": "GeoCoordinates",
      latitude: "40.3892857",
      longitude: "49.8267558",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "$$",
  },
};

// Structured Data for Organization (Legacy - for backward compatibility)
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FuneralHome",
    name: siteConfig.name,
    description: siteConfig.description.en,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
      postalCode: siteConfig.address.postalCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "40.3892857",
      longitude: "49.8267558",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "$$",
    areaServed: [
      {
        "@type": "Country",
        name: "Azerbaijan",
      },
      {
        "@type": "Country",
        name: "Russia",
      },
      {
        "@type": "Country",
        name: "Ukraine",
      },
    ],
    sameAs: [
      // Add your social media links here when available
      // "https://www.facebook.com/your-page",
      // "https://www.instagram.com/your-page",
    ],
  };
}

// Get Funeral Home Schema by Locale
export function getFuneralHomeSchemaByLocale(locale: "en" | "ru" | "az") {
  return funeralHomeSchemaByLocale[locale] || funeralHomeSchemaByLocale.en;
}

// Structured Data for Local Business
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description.en,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
      postalCode: siteConfig.address.postalCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "40.3892857",
      longitude: "49.8267558",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    priceRange: "$$",
  };
}

// Structured Data for Service
export function getServiceSchema(service: {
  name: string;
  description: string;
  image: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "FuneralHome",
      name: siteConfig.name,
      telephone: siteConfig.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.city,
        addressCountry: siteConfig.address.country,
      },
    },
    image: service.image,
    url: `${siteConfig.url}/services/${service.slug}`,
    areaServed: {
      "@type": "Country",
      name: "Azerbaijan",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: siteConfig.url,
      servicePhone: siteConfig.phone,
    },
  };
}

// Breadcrumb Schema
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}
