import type { Metadata } from "next";
import EventsClient from "./EventsClient";

export const metadata: Metadata = {
  title: "Events",
  description:
    "From galas to benefit dinners to tennis fundraisers — explore AAD's community events that bring the AAPI community together and raise funds for undergraduates.",
  openGraph: {
    title: "Events | Asian American Dream",
    description:
      "Explore AAD's community events — galas, benefit dinners, and tennis fundraisers supporting AAPI undergraduates.",
    url: "https://asianamericandream.org/events",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Asian American Dream Events",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Events | Asian American Dream",
    description:
      "Explore AAD's community events — galas, benefit dinners, and tennis fundraisers supporting AAPI undergraduates.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://asianamericandream.org/events",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://asianamericandream.org" },
    { "@type": "ListItem", position: 2, name: "Events", item: "https://asianamericandream.org/events" },
  ],
};

export default function EventsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <EventsClient />
    </>
  );
}
