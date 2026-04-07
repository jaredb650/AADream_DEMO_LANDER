import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const SITE_URL = "https://asianamericandream.org";
const SITE_NAME = "Asian American Dream";
const SITE_DESCRIPTION =
  "Asian American Dream is a 501(c)(3) nonprofit empowering first-generation, low-income AAPI undergraduates through mentorship, professional development, and career advancement programs in New York.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F2A44",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Asian American Dream | Empowering AAPI Undergraduates",
    template: "%s | Asian American Dream",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Asian American Dream",
    "AAPI",
    "nonprofit",
    "mentorship",
    "career development",
    "first-generation college students",
    "low-income students",
    "Asian American",
    "Pacific Islander",
    "New York",
    "professional development",
    "career advancement",
    "AAPI undergraduates",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Asian American Dream | Empowering AAPI Undergraduates",
    description:
      "Empowering first-generation, low-income AAPI undergraduates through mentorship, professional development, and career advancement.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Asian American Dream - Empowering AAPI Undergraduates",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asian American Dream | Empowering AAPI Undergraduates",
    description:
      "Empowering first-generation, low-income AAPI undergraduates through mentorship, professional development, and career advancement.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  other: {
    "msapplication-TileColor": "#0F2A44",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NonprofitOrganization",
  name: SITE_NAME,
  alternateName: "AAD",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logos/logo-black.png`,
  description: SITE_DESCRIPTION,
  taxID: "87-1056467",
  nonprofitStatus: "501(c)(3)",
  foundingDate: "2021",
  areaServed: {
    "@type": "City",
    name: "New York",
  },
  sameAs: [
    "https://www.instagram.com/asianamericandream/",
    "https://www.linkedin.com/company/asian-american-dream/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "kevin@asianamericandream.org",
    contactType: "general",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${sora.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
