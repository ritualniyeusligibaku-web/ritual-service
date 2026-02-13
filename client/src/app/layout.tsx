import type { Metadata } from "next";
import {
  Playfair_Display,
  Cormorant_Garamond,
  Geologica,
} from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";

// Montserrat for navigation and UI elements - clean and modern
const montserrat = localFont({
  src: [
    {
      path: "../../public/fonts/Montserrat/Montserrat-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/Montserrat/Montserrat-Italic-VariableFont_wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

// Montserrat for body text - readable and professional
const montserratBody = localFont({
  src: [
    {
      path: "../../public/fonts/Montserrat/Montserrat-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/Montserrat/Montserrat-Italic-VariableFont_wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-body",
  display: "swap",
});

// Elegant serif for headings - dignified and classical
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Refined serif for accent/display - sophisticated
const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const geologica = Geologica({
  variable: "--font-geologica",
  subsets: ["latin", "cyrillic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ritualservice.org'),
  title: {
    default: "Ritual Service: Похоронные услуги - Профессиональные ритуальные услуги в Баку",
    template: "%s | Ritual Service",
  },
  description:
    "Мы помогаем с недорогой транспортировкой усопших на родину, организацией похорон и поминальных церемоний на достойном уровне. Также осуществляем оформление документов для перевозки тела за границу. Профессиональные ритуальные услуги в Баку, Азербайджане. Доступны 24/7.",
  keywords: [
    "ритуальные услуги Баку",
    "похоронные услуги Азербайджан",
    "транспортировка усопших",
    "организация похорон",
    "поминальные церемонии",
    "funeral services Baku",
    "burial services Azerbaijan",
    "ritual services",
    "dəfn xidmətləri Bakı",
  ],
  authors: [{ name: "Ritual Service" }],
  creator: "Ritual Service",
  publisher: "Ritual Service",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://ritualservice.org",
    siteName: "Ритуальные услуги",
    title: "Ритуальные услуги: Похоронные услуги - Профессиональные ритуальные услуги в Баку",
    description:
      "Мы помогаем с недорогой транспортировкой усопших на родину, организацией похорон и поминальных церемоний на достойном уровне. Профессиональные ритуальные услуги в Баку. Доступны 24/7.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ritual Service - Ритуальные услуги",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ритуальные услуги: Похоронные услуги - Профессиональные ритуальные услуги",
    description:
      "Мы помогаем с недорогой транспортировкой усопших на родину, организацией похорон и поминальных церемоний. Доступны 24/7.",
    images: ["/og-image.jpg"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#997E67" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body
        className={`${cormorantGaramond.variable} ${montserratBody.variable} ${playfairDisplay.variable} ${montserrat.variable} ${geologica.variable} antialiased`}
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
