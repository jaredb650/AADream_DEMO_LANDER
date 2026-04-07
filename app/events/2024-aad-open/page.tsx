import type { Metadata } from "next";
import EventLayout, { ResultsTable, PhotoGallery } from "../EventLayout";

const BASE = "";

export const metadata: Metadata = {
  title: "2024 AAD Open | Asian American Dream",
  description: "The second annual AAD Open tennis fundraiser at USTA Billie Jean King National Tennis Center.",
  openGraph: {
    title: "2024 AAD Open | Asian American Dream",
    description: "The second annual AAD Open at USTA Billie Jean King National Tennis Center.",
    url: "https://asianamericandream.org/events/2024-aad-open",
    type: "website",
    images: [{ url: "/images/events/event-1.jpg", width: 1200, height: 630, alt: "2024 AAD Open" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "2024 AAD Open | Asian American Dream",
    description: "The second annual AAD Open at USTA Billie Jean King National Tennis Center.",
    images: ["/images/events/event-1.jpg"],
  },
  alternates: { canonical: "https://asianamericandream.org/events/2024-aad-open" },
};

export default function Event2024AADOpen() {
  return (
    <EventLayout
      title="2024 AAD Open"
      date="June 8, 2024"
      tag="Fundraiser"
      heroImage={`${BASE}/images/events/event-3.jpg`}
    >
      <p>
        On June 8, 2024, we hosted our second annual tennis fundraiser at the <strong>USTA Billie
        Jean King National Tennis Center</strong>, home of the US Open.
      </p>

      <p>
        <strong>Jocelyn Cruz-Alfalla</strong>, the Director of Community and Schools Tennis at USTA
        Eastern, was honored with <strong>AAD&apos;s signature Asian American Dreamer
        award</strong> for her invaluable contributions to the AAPI and tennis community in New York.
      </p>

      <p>
        Thank you to our wonderful community of players, attendees, and
        sponsors: <strong>USTA Eastern</strong>, <strong>Capri Holdings</strong>, ELOREA,
        Sanzo, Lunar, Trophy Central, and Covry for your support. And a huge shoutout
        to <strong>Sanae Ohta</strong> and <strong>Miho Kowase</strong> for leading our first ever
        Women&apos;s Tennis Social.
      </p>

      <h2>Champions &amp; Finalists</h2>

      <ResultsTable
        flights={[
          {
            name: "Mixed Flight",
            champions: "Crissianne Issa Kintanar & Gustavo Loza",
            finalists: "Sanae Ohta & Ethan Ha",
          },
          {
            name: "A Flight",
            champions: "Sergiu Celebidachi & Zachary Portnoy",
            finalists: "Rohan Chandrasekhar & Ethan Ha",
          },
          {
            name: "B Flight",
            champions: "Timothy Chiang & Darren Ting",
            finalists: "Varun Deedwaniya & Alec Liu",
          },
        ]}
      />

      <PhotoGallery
        images={[
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/06/1-1-1024x683.jpg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/06/IMG_1161-1024x683.jpg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/06/IMG_0575-1024x683.jpg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/06/IMG_0960-1024x683.jpg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/06/IMG_1202-1-1024x683.jpg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/06/7-1-1024x683.jpg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/06/IMG_0552-1-683x1024.jpg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/06/1-1024x683.jpg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/06/IMG_1186-1024x683.jpg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/06/IMG_1168-1-1024x683.jpg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/06/IMG_1193-1024x683.jpg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/06/6-1-1024x683.jpg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/06/3-1-683x1024.jpg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/06/IMG_1226-1-1024x683.jpg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/06/10-1024x683.jpg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/06/2-1024x683.jpg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/06/9-1024x683.jpg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/06/IMG_1196-1024x683.jpg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/06/IMG_0631-1024x683.jpg?ssl=1",
        ]}
      />
    </EventLayout>
  );
}
