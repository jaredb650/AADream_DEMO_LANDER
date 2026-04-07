import type { Metadata } from "next";
import EventLayout, { ResultsTable, PhotoGallery } from "../EventLayout";

const BASE = "";

export const metadata: Metadata = {
  title: "2023 Inaugural AAD Open",
  description: "The inaugural AAD Open tennis fundraiser at Chestnut Ridge Racquet Club.",
  openGraph: {
    title: "2023 Inaugural AAD Open | Asian American Dream",
    description: "The inaugural AAD Open tennis fundraiser at Chestnut Ridge Racquet Club.",
    url: "https://asianamericandream.org/events/2023-inaugural-aad-open",
    type: "website",
    images: [{ url: "/images/events/event-1.jpg", width: 1200, height: 630, alt: "2023 Inaugural AAD Open" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "2023 Inaugural AAD Open | Asian American Dream",
    description: "The inaugural AAD Open tennis fundraiser at Chestnut Ridge Racquet Club.",
    images: ["/images/events/event-1.jpg"],
  },
  alternates: { canonical: "https://asianamericandream.org/events/2023-inaugural-aad-open" },
};

export default function Event2023AADOpen() {
  return (
    <EventLayout
      title="2023 Inaugural AAD Open"
      date="August 19, 2023"
      tag="Fundraiser"
      heroImage={`${BASE}/images/events/event-1.jpg`}
    >
      <p>
        On August 19, 2023 we hosted our inaugural AAD Open at <strong>Chestnut Ridge Racquet
        Club</strong>. Our first-ever tennis fundraiser featured an exciting doubles tennis
        tournament and the AAD Open Afterparty Presented by Mo&euml;t Hennessy.
      </p>

      <p>
        Players and attendees alike explored 10+ vendor booths, dove into a culinary journey with
        food from <strong>Happy Tuna</strong>, <strong>Dumplings for Yu</strong>, and the Mobile Pie
        Pizza Truck, and sipped on premium drinks from <strong>Mo&euml;t Hennessy</strong> and Sanzo.
      </p>

      <p>
        Later on, we danced to the beat of DJ Hengtime and jumped into open tennis
        play! <strong>Andy Yu</strong>, a local icon and tennis player, was honored
        with <strong>AAD&apos;s inaugural Asian American Dreamer award</strong> for uplifting Pan
        Asian American and LGBTQIA+ communities and beyond, through fashion, food, culture, and
        tennis.
      </p>

      <p>
        Thank you to our sponsors, partners, players, and attendees for turning this dream into a
        reality.
      </p>

      <h2>Champions &amp; Finalists</h2>

      <ResultsTable
        flights={[
          {
            name: "Mixed Flight",
            champions: "Samantha Lieb & Wesley Maddox",
            finalists: "Cade Pierson & Ethan Ha",
          },
          {
            name: "A Flight",
            champions: "Sergiu Celebidachi & Zachary Portnoy",
            finalists: "Brendan Jimenez & Benjamin Maffa",
          },
          {
            name: "B Flight",
            champions: "Varun Deedwaniya & Alec Liu",
            finalists: "Timothy Chiang & Daniel Murphy",
          },
        ]}
      />

      <PhotoGallery
        images={[
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2023/08/ZNA09754-1024x683.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2023/08/IMG_7719-1024x683.jpg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2023/08/ZNA09732-1024x683.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2023/08/ZNA09688-1024x683.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2023/08/ZNA00015-1024x819.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2023/08/ZNA09993-1024x683.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2023/08/ZNA09986.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2023/08/ZNA09906.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2023/08/ZNA09975-1024x683.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2023/08/ZNA00004-1024x683.jpeg?ssl=1",
        ]}
      />
    </EventLayout>
  );
}
