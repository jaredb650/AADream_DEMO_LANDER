import type { Metadata } from "next";
import EventLayout, { PhotoGallery } from "../EventLayout";

const BASE = "";

export const metadata: Metadata = {
  title: "2024 Table of Dreams | Asian American Dream",
  description: "AAD's inaugural Giving Tuesday benefit dinner at La Dồng in New York City, sponsored by Mizuho Americas.",
  openGraph: {
    title: "2024 Table of Dreams | Asian American Dream",
    description: "AAD's inaugural Giving Tuesday benefit dinner at La Dồng in NYC, sponsored by Mizuho Americas.",
    url: "https://asianamericandream.org/events/table-of-dreams",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "2024 Table of Dreams" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "2024 Table of Dreams | Asian American Dream",
    description: "AAD's inaugural Giving Tuesday benefit dinner at La Dồng in NYC, sponsored by Mizuho Americas.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: "https://asianamericandream.org/events/table-of-dreams" },
};

export default function EventTableOfDreams() {
  return (
    <EventLayout
      title="2024 Table of Dreams"
      date="December 3, 2024"
      tag="Benefit Dinner"
      heroImage={`${BASE}/images/events/event-2.jpg`}
    >
      <p>
        On December 3, 2024, Asian American Dream hosted our inaugural Giving Tuesday benefit
        dinner &ndash; <strong>Table of Dreams</strong> &ndash; at La D&#7891;ng, a Vietnamese
        restaurant in New York City.
      </p>

      <p>
        If there was one word to describe our first annual benefit dinner, it would
        be: <strong>family</strong>. From the moment guests arrived, they were greeted with the
        festive sounds of laughter, joy, and kinship. It felt like home.
      </p>

      <p>
        Attendees enjoyed authentic Vietnamese cuisine including b&uacute;n ch&#7843;,
        ph&#7903; g&agrave;, and c&agrave; ph&ecirc; &ndash; each dish a reminder of the rich
        cultural traditions that connect the AAPI community.
      </p>

      <h2>Thank You</h2>

      <p>
        We extend our deepest gratitude to <strong>La D&#7891;ng</strong> and its
        owners, <strong>Jaru and Zyndi</strong>, for welcoming us to their beautiful restaurant and
        creating such a fantastic rendition of Vietnamese cuisine.
      </p>

      <p>
        A special thank you to <strong>Mizuho Americas</strong>, the title sponsor for our inaugural
        benefit dinner, for empowering the next generation of AAPI leaders through their generous
        support.
      </p>
      <PhotoGallery
        images={[
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/12/2D3B3683-DEF0-42DF-A990-4D81A7DEEF14-614x1024.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/12/582F3079-8234-409F-BA92-B7D9A063A26A-1024x731.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/12/5A5B94CC-2071-4693-95A0-94846789F779-1024x723.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/12/9AE8E2D3-85AD-4898-AA63-04FBE7D870DC-1024x674.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/12/52C2085A-5CE0-42AB-B3E7-966159A4E13D-1024x686.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/12/0058AD40-2EB1-4BEA-9D4B-A5B3EA42EC17-760x1024.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/12/22C1B87B-64F1-4153-96F9-4127CCCBC2EB-715x1024.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/12/94E78F32-24DE-4E02-9AFC-6F4F8F0F97EF-1024x708.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/12/4049C24F-C5B9-4DC2-B3BA-2606353245AD-749x1024.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/12/40299A34-2D0F-4FEA-924D-838A24888F66-685x1024.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/12/62347B54-814F-4557-B7D0-148516012625-1024x802.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/12/AAB2633B-4436-41BB-81E8-25AFF5B5FA24-1024x691.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/12/BB666366-A5E2-4449-AA32-3A096CCF740D-684x1024.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/12/ECAAD000-F117-4606-98FC-C515AF31FA78-1024x684.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/12/AE59E421-155C-4140-9FAD-F22F4043C0D5-1024x685.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/12/C72C6A32-6614-432B-B0C5-1D8CDD807D15-1024x729.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/12/C6CDCA65-4D87-4C62-B8B5-1D14391EF2B8-1024x690.jpeg?ssl=1",
          "https://i0.wp.com/asianamericandream.org/wp-content/uploads/2024/12/E15A7FB6-3551-4013-839A-939F779F38D2-1024x685.jpeg?ssl=1",
        ]}
      />
    </EventLayout>
  );
}
