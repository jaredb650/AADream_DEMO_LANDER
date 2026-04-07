import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Asian American Dream | Empowering AAPI Undergraduates",
  description:
    "Asian American Dream is a 501(c)(3) nonprofit empowering first-generation, low-income AAPI undergraduates through mentorship, professional development, and career advancement programs in New York.",
  openGraph: {
    title: "Asian American Dream | Empowering AAPI Undergraduates",
    description:
      "Empowering first-generation, low-income AAPI undergraduates through mentorship, professional development, and career advancement.",
    url: "https://asianamericandream.org",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Asian American Dream – Empowering AAPI Undergraduates",
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
    canonical: "https://asianamericandream.org",
  },
};

export default function Home() {
  return <HomeClient />;
}
